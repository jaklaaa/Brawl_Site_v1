(function () {
    "use strict";

    const TIER_KEYS = ["S", "A", "B", "C", "D", "F"];

    const LAST_UPDATED = {
        "Trophies":    "2026-03-03",
        "Brawl Arena": "2026-03-03",
        "Diamond":     "2026-03-03",
        "Mythic":      "2026-03-03",
        "Legendary":   "2026-03-03",
        "Masters":     "2026-02-07",
        "Pro":         "2026-02-07",
    };

    const RARITY_ORDER = [
        "starter", "rare", "super rare", "epic", "mythic", "legendary", "ultra legendary"
    ];

    let currentRank   = RANKS[0].key;
    let currentMode   = "premade";
    let currentSort   = "default";
    let searchQuery   = "";

    let draggedId  = null;
    let dragSource = null;
    let touchClone = null;
    let didDrag    = false;   

    let sharedCustom = null;

    function getSharedCustomState() {
        if (!sharedCustom) {
            sharedCustom = { S:[], A:[], B:[], C:[], D:[], F:[], pool: BRAWLERS.map(b => b.id) };
        }
        return sharedCustom;
    }

    const LS_KEY = "bsTierCustom_v3";

    function saveAll() {
        try { localStorage.setItem(LS_KEY, JSON.stringify(sharedCustom)); } catch {}
    }

    function loadAll() {
        try {
            const raw = JSON.parse(localStorage.getItem(LS_KEY));
            if (!raw || typeof raw !== "object") return;
            const valid  = new Set(BRAWLERS.map(b => b.id));
            const placed = new Set();
            const state  = { S:[], A:[], B:[], C:[], D:[], F:[], pool:[] };
            TIER_KEYS.forEach(t => {
                state[t] = (raw[t] || []).filter(id => valid.has(id));
                state[t].forEach(id => placed.add(id));
            });
            state.pool = (raw.pool || []).filter(id => valid.has(id) && !placed.has(id));
            BRAWLERS.forEach(b => {
                if (!placed.has(b.id) && !state.pool.includes(b.id)) state.pool.push(b.id);
            });
            sharedCustom = state;
        } catch {}
    }

    function getBrawler(id) { return BRAWLERS.find(b => b.id === id); }

    function rarityRank(b) {
        const idx = RARITY_ORDER.indexOf((b.rarity || "").toLowerCase());
        return idx === -1 ? 99 : idx;
    }

    function sortedIds(ids) {
        if (currentSort === "default") return [...ids];
        const brawlers = ids.map(id => getBrawler(id)).filter(Boolean);
        brawlers.sort((a, b) => {
            switch (currentSort) {
                case "az":          return a.name.localeCompare(b.name);
                case "za":          return b.name.localeCompare(a.name);
                case "rarity-asc":  return rarityRank(a) - rarityRank(b);
                case "rarity-desc": return rarityRank(b) - rarityRank(a);
                default: return 0;
            }
        });
        return brawlers.map(b => b.id);
    }

    function filteredIds(ids) {
        const q = searchQuery.trim().toLowerCase();
        if (!q) return ids;
        return ids.filter(id => {
            const b = getBrawler(id);
            return b && b.name.toLowerCase().includes(q);
        });
    }

    function getInsertIndex(container, clientX, clientY) {
        const cards = [...container.querySelectorAll(".brawler-card")];
        for (let i = 0; i < cards.length; i++) {
            const rect = cards[i].getBoundingClientRect();
            const midX = rect.left + rect.width  / 2;
            if (clientY < rect.top)  return i;
            if (clientY >= rect.top && clientY <= rect.bottom && clientX < midX) return i;
        }
        return cards.length;
    }

    function moveBrawler(id, from, to, insertIdx) {
        if (!id) return;
        const state = getSharedCustomState();
        if (from === "pool") state.pool = state.pool.filter(x => x !== id);
        else if (TIER_KEYS.includes(from)) state[from] = state[from].filter(x => x !== id);
        const dest = (to === "pool") ? state.pool : state[to];
        if (!dest) return;
        const idx = (insertIdx === undefined) ? dest.length : Math.min(insertIdx, dest.length);
        dest.splice(idx, 0, id);
        render();
        saveAll();
    }

    let dropIndicator = null;

    function ensureIndicator() {
        if (!dropIndicator) {
            dropIndicator = document.createElement("div");
            dropIndicator.id = "dropIndicator";
            dropIndicator.style.cssText = [
                "width:3px", "min-height:52px", "align-self:stretch",
                "border-radius:3px", "flex-shrink:0", "pointer-events:none",
                "background:rgba(255,255,255,0.75)",
                "box-shadow:0 0 8px rgba(255,255,255,0.55)",
            ].join(";");
        }
        return dropIndicator;
    }

    function showIndicator(container, insertIdx) {
        const ind   = ensureIndicator();
        const cards = [...container.querySelectorAll(".brawler-card")];
        if (insertIdx >= cards.length) container.appendChild(ind);
        else container.insertBefore(ind, cards[insertIdx]);
    }

    function hideIndicator() { dropIndicator?.remove(); }

    function goToGuide(brawlerId) {
        window.location.href = `../Guide_Pages/${brawlerId}.html`;
    }

function makeCard(brawlerId, zone, editable) {
    const b = getBrawler(brawlerId);
    if (!b) return null;

    const card = document.createElement("div");
    card.className    = "brawler-card";
    card.title        = b.name;
    card.dataset.id   = b.id;
    card.dataset.zone = zone;
    if (editable) card.draggable = true;

    const img = document.createElement("img");
    img.src = portraitUrl(b.key);
    img.alt = b.name;
    img.onerror = function () {
        this.remove();
        card.style.cssText += ";display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:700;color:#fff;letter-spacing:0;text-align:center;padding:2px;";
        card.textContent = b.name.slice(0, 5).toUpperCase();
    };
    card.appendChild(img);

    if (editable) {
        card.addEventListener("dragstart", onDragStart);
        card.addEventListener("dragend",   onDragEnd);
        card.addEventListener("touchstart", onTouchStart, { passive: true });
        card.addEventListener("touchmove",  onTouchMove,  { passive: false });
        card.addEventListener("touchend",   onTouchEnd);
    }

    const tooltip = document.getElementById('brawlerTooltip');

    card.addEventListener('mouseenter', () => {
        document.getElementById('ttName').textContent   = b.name;
        document.getElementById('ttRarity').textContent = b.rarity || '—';

        let tierLabel = '—';
        if (currentMode === 'premade') {
            const premade = PREMADE_TIERS[currentRank] || {};
            for (const t of TIER_KEYS) {
                if ((premade[t] || []).includes(b.id)) { tierLabel = t; break; }
            }
        } else {
            const state = getSharedCustomState();
            for (const t of TIER_KEYS) {
                if (state[t].includes(b.id)) { tierLabel = t; break; }
            }
        }
        document.getElementById('ttTierVal').textContent = tierLabel;

        tooltip.classList.add('visible');     
    });

    return card;
}
    function updateLastUpdatedLabel() {
        let label = document.getElementById("lastUpdatedLabel");
        if (!label) {
            label = document.createElement("p");
            label.id = "lastUpdatedLabel";
            label.style.cssText = [
                "text-align:center",
                "font-family:'Orbitron',sans-serif",
                "font-size:11px",
                "letter-spacing:1px",
                "color:rgba(255,255,255,0.3)",
                "margin:2px auto 12px",
            ].join(";");
            const tierList = document.querySelector(".custom-tier-list");
            if (tierList) tierList.before(label);
        }

        if (currentMode === "premade") {
            const dateStr = LAST_UPDATED[currentRank];
            label.textContent = dateStr
                ? `Last updated: ${new Date(dateStr).toLocaleDateString("en-GB", { day:"numeric", month:"long", year:"numeric" })}`
                : "Last updated: —";
            label.style.display = "";
        } else {
            label.style.display = "none";
        }
    }

    function render() {
        const editable    = (currentMode === "custom");
        const poolSection = document.getElementById("brawler-pool-section");

        if (editable) {
            const state = getSharedCustomState();
            TIER_KEYS.forEach(t => {
                const c = document.getElementById(`tier-${t}-brawlers`);
                if (!c) return;
                c.innerHTML = "";
                sortedIds(state[t]).forEach(id => {
                    const card = makeCard(id, t, true);
                    if (card) c.appendChild(card);
                });
            });

            const pool = document.getElementById("brawler-pool");
            if (pool) {
                pool.innerHTML = "";
                const visible = filteredIds(sortedIds(state.pool));
                visible.forEach(id => {
                    const card = makeCard(id, "pool", true);
                    if (card) pool.appendChild(card);
                });
                if (visible.length === 0 && state.pool.length > 0) {
                    const empty = document.createElement("div");
                    empty.style.cssText = "color:rgba(255,255,255,0.2);font-family:'Orbitron',sans-serif;font-size:11px;letter-spacing:1px;padding:8px;";
                    empty.textContent = "No brawlers match your search.";
                    pool.appendChild(empty);
                }
            }
            if (poolSection) poolSection.style.display = "";
        } else {
            const premade = PREMADE_TIERS[currentRank] || {};
            TIER_KEYS.forEach(t => {
                const c = document.getElementById(`tier-${t}-brawlers`);
                if (!c) return;
                c.innerHTML = "";
                (premade[t] || []).forEach(id => {
                    const card = makeCard(id, t, false);
                    if (card) c.appendChild(card);
                });
            });
            if (poolSection) poolSection.style.display = "none";
        }

        updateLastUpdatedLabel();
    }

    function onDragStart(e) {
        draggedId  = e.currentTarget.dataset.id;
        dragSource = e.currentTarget.dataset.zone;
        didDrag    = true;
        setTimeout(() => e.currentTarget.classList.add("dragging"), 0);
        e.dataTransfer.effectAllowed = "move";
    }

    function onDragEnd(e) {
        e.currentTarget.classList.remove("dragging");
        draggedId = dragSource = null;
        hideIndicator();
        setTimeout(() => { didDrag = false; }, 50);
    }

    function setupDropZones() {
        document.querySelectorAll("[data-dropzone]").forEach(zone => {
            zone.addEventListener("dragover", e => {
                e.preventDefault();
                zone.classList.add("drag-over");
                if (currentMode === "custom") showIndicator(zone, getInsertIndex(zone, e.clientX, e.clientY));
            });
            zone.addEventListener("dragleave", e => {
                if (!zone.contains(e.relatedTarget)) {
                    zone.classList.remove("drag-over");
                    hideIndicator();
                }
            });
            zone.addEventListener("drop", e => {
                e.preventDefault();
                zone.classList.remove("drag-over");
                if (currentMode === "custom") {
                    const idx = getInsertIndex(zone, e.clientX, e.clientY);
                    hideIndicator();
                    moveBrawler(draggedId, dragSource, zone.dataset.dropzone, idx);
                }
            });
        });
    }

    function onTouchStart(e) {
        const card = e.currentTarget;
        draggedId  = card.dataset.id;
        dragSource = card.dataset.zone;
        didDrag    = false;
        const rect = card.getBoundingClientRect();
        touchClone = card.cloneNode(true);
        Object.assign(touchClone.style, {
            position:"fixed", pointerEvents:"none", opacity:"0.85", zIndex:"9999",
            width: rect.width+"px", height: rect.height+"px",
            left: rect.left+"px", top: rect.top+"px",
            borderRadius:"10px", boxShadow:"0 8px 32px rgba(0,0,0,0.5)",
        });
        document.body.appendChild(touchClone);
    }

    function onTouchMove(e) {
        e.preventDefault();
        didDrag = true;
        if (!touchClone) return;
        const t = e.touches[0];
        touchClone.style.left = (t.clientX - 32) + "px";
        touchClone.style.top  = (t.clientY - 32) + "px";
        if (currentMode === "custom") {
            touchClone.style.visibility = "hidden";
            const el = document.elementFromPoint(t.clientX, t.clientY);
            touchClone.style.visibility = "";
            const dz = el?.closest("[data-dropzone]");
            if (dz) showIndicator(dz, getInsertIndex(dz, t.clientX, t.clientY));
            else hideIndicator();
        }
    }

    function onTouchEnd(e) {
        if (touchClone) { touchClone.remove(); touchClone = null; }
        hideIndicator();
        const t  = e.changedTouches[0];
        const el = document.elementFromPoint(t.clientX, t.clientY);
        const dz = el?.closest("[data-dropzone]");

        if (didDrag) {
            if (dz && currentMode === "custom") {
                moveBrawler(draggedId, dragSource, dz.dataset.dropzone, getInsertIndex(dz, t.clientX, t.clientY));
            }
        } else {
            const card = el?.closest(".brawler-card");
            if (card) goToGuide(card.dataset.id);
        }

        draggedId = dragSource = null;
        setTimeout(() => { didDrag = false; }, 50);
    }

    function buildRankIcons() {
        const grid  = document.getElementById("rankGrid");
        const title = document.getElementById("rankMainTitle");
        if (!grid) return;

        RANKS.forEach(rank => {
            const img = document.createElement("img");
            img.src       = rankLogoUrl(rank.logoFile);
            img.alt       = rank.label;
            img.title     = rank.label;
            img.className = "rank-icon";
            img.dataset.rank  = rank.key;
            img.dataset.color = rank.color;
            img.onerror = function () {
                const div = document.createElement("div");
                div.className = "rank-icon rank-placeholder";
                div.dataset.rank  = rank.key;
                div.dataset.color = rank.color;
                div.textContent   = rank.label.toUpperCase().slice(0, 6);
                div.style.cssText = `background:${rank.color}22;border:2px solid ${rank.color}66;color:${rank.color};width:70px;height:64px;display:flex;align-items:center;justify-content:center;border-radius:12px;cursor:pointer;font-size:10px;font-weight:700;letter-spacing:1px;transition:transform .2s,box-shadow .2s;`;
                this.replaceWith(div);
                addRankClick(div, rank, title);
            };
            addRankClick(img, rank, title);
            grid.appendChild(img);
        });

        const first = grid.children[0];
        if (first) first.click();
    }

    function addRankClick(el, rank, title) {
        el.addEventListener("click", () => {
            document.querySelectorAll("#rankGrid .rank-icon, #rankGrid .rank-placeholder").forEach(i => {
                i.classList.remove("selected");
                i.style.boxShadow = "none";
            });
            el.classList.add("selected");
            el.style.boxShadow = `0 0 22px ${rank.color}`;
            currentRank = rank.key;
            if (title) {
                title.textContent = rank.key + " Tier List";
                title.style.color = rank.color;
            }
            setMode("premade");
        });
    }

    function buildModeBar() {
        if (document.getElementById("modeBar")) return;
        const bar = document.createElement("div");
        bar.id = "modeBar";
        bar.innerHTML = `
            <div class="mode-bar-inner">
                <button class="mode-btn mode-active" id="btnPremade">Ranked</button>
                <button class="mode-btn" id="btnCustom">✏ Create Your Own</button>
                <button class="mode-btn" id="btnSavePremade" title="Save tier list as image">⬇ Save</button>
            </div>
            <p class="custom-mode-note" id="customModeNote" style="display:none">
                Drag brawlers between tiers. Click any brawler to view their guide. Saved automatically.
            </p>
        `;
        const tierList = document.querySelector(".custom-tier-list");
        if (tierList) tierList.after(bar);

        document.getElementById("btnPremade").addEventListener("click", () => setMode("premade"));
        document.getElementById("btnCustom").addEventListener("click",  () => setMode("custom"));
        document.getElementById("btnSavePremade").addEventListener("click", () => downloadTierList(true));
    }

    function setMode(mode) {
        currentMode = mode;
        render();
        document.getElementById("btnPremade")?.classList.toggle("mode-active", mode === "premade");
        document.getElementById("btnCustom")?.classList.toggle("mode-active",  mode === "custom");
        const note = document.getElementById("customModeNote");
        if (note) note.style.display = mode === "custom" ? "" : "none";

        const saveBtn = document.getElementById("btnSavePremade");
        if (saveBtn) saveBtn.style.display = mode === "premade" ? "" : "none";
    }

    function buildPool() {
        if (document.getElementById("brawler-pool-section")) return;
        const section = document.createElement("div");
        section.id = "brawler-pool-section";
        section.innerHTML = `
            <div class="pool-header">
                <span class="pool-title">Unranked Brawlers</span>
                <div style="display:flex;gap:8px;">
                    <button class="download-btn" id="downloadBtn">⬇ Save Image</button>
                    <button class="reset-btn"    id="resetBtn">Reset</button>
                </div>
            </div>

            <div id="poolToolbar">
                <div id="poolSearchWrap">
                    <svg id="poolSearchIcon" width="13" height="13" viewBox="0 0 24 24" fill="none"
                         stroke="rgba(255,255,255,0.35)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                    </svg>
                    <input id="poolSearch" type="text" placeholder="Search brawler…" autocomplete="off" spellcheck="false">
                    <button id="poolSearchClear" title="Clear">✕</button>
                </div>
                <div id="poolSortBtns">
                    <button class="sort-btn sort-active" data-sort="default">Default</button>
                    <button class="sort-btn" data-sort="az">A–Z</button>
                    <button class="sort-btn" data-sort="za">Z–A</button>
                    <button class="sort-btn" data-sort="rarity-asc"  title="Lowest rarity first">★↑</button>
                    <button class="sort-btn" data-sort="rarity-desc" title="Highest rarity first">★↓</button>
                </div>
            </div>

            <div class="brawler-pool" id="brawler-pool" data-dropzone="pool"></div>
        `;
        document.getElementById("modeBar")?.after(section);

        document.getElementById("resetBtn").addEventListener("click", () => {
            sharedCustom = { S:[], A:[], B:[], C:[], D:[], F:[], pool: BRAWLERS.map(b => b.id) };
            render();
            saveAll();
        });

        document.getElementById("downloadBtn").addEventListener("click", () => downloadTierList(false));

        const searchInput = document.getElementById("poolSearch");
        const clearBtn    = document.getElementById("poolSearchClear");
        searchInput.addEventListener("input", function () {
            searchQuery = this.value;
            clearBtn.style.display = this.value ? "flex" : "none";
            render();
        });
        clearBtn.addEventListener("click", () => {
            searchInput.value = "";
            searchQuery = "";
            clearBtn.style.display = "none";
            searchInput.focus();
            render();
        });
        clearBtn.style.display = "none";

        document.querySelectorAll(".sort-btn").forEach(btn => {
            btn.addEventListener("click", () => {
                currentSort = btn.dataset.sort;
                document.querySelectorAll(".sort-btn").forEach(b => b.classList.remove("sort-active"));
                btn.classList.add("sort-active");
                render();
            });
        });
    }

    /**
     * @param {boolean} isPremade - if true, uses the current rank label as filename
     *                              and always includes watermark. Also shows the
     *                              MetaLock copyright strip at the bottom.
     */
    function downloadTierList(isPremade) {
        const btn = isPremade
            ? document.getElementById("btnSavePremade")
            : document.getElementById("downloadBtn");

        if (btn) { btn.textContent = "Capturing..."; btn.disabled = true; }

        function runCapture() {
            const target    = document.querySelector(".custom-tier-list");
            const watermark = document.getElementById("tierlistWatermark");
            const dpr       = window.devicePixelRatio || 1;

            const origWm = watermark ? watermark.style.display : null;
            if (watermark) watermark.style.display = "flex";

            html2canvas(target, {
                backgroundColor: document.body.classList.contains("theme-light") ? "#f3f4f6" : "#12131a",
                scale: dpr * 2,
                useCORS: true,
                allowTaint: false,
                logging: false,
                onclone: (_doc, el) => {
                    el.querySelectorAll("img").forEach(img => { img.style.imageRendering = "auto"; });
                },
            }).then(canvas => {
                if (watermark && origWm !== null) watermark.style.display = origWm;

                const FOOTER_H = 40;
                const out = document.createElement("canvas");
                out.width  = canvas.width;
                out.height = canvas.height + FOOTER_H * dpr * 2;
                const ctx = out.getContext("2d");
                ctx.imageSmoothingEnabled = true;
                ctx.imageSmoothingQuality = "high";

                ctx.drawImage(canvas, 0, 0);

                const isLight = document.body.classList.contains("theme-light");
                ctx.fillStyle = isLight ? "#e5e7eb" : "#0d0d18";
                ctx.fillRect(0, canvas.height, out.width, FOOTER_H * dpr * 2);

                ctx.strokeStyle = isLight ? "rgba(0,0,0,0.1)" : "rgba(255,255,255,0.07)";
                ctx.lineWidth   = 1 * dpr;
                ctx.beginPath();
                ctx.moveTo(0, canvas.height);
                ctx.lineTo(out.width, canvas.height);
                ctx.stroke();

                const footerY = canvas.height + (FOOTER_H * dpr * 2) / 2;
                ctx.font      = `700 ${11 * dpr * 2}px Orbitron, sans-serif`;
                ctx.fillStyle = isLight ? "rgba(0,0,0,0.3)" : "rgba(255,255,255,0.22)";
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";
                ctx.letterSpacing = `${2 * dpr}px`;
                ctx.fillText("Made with MetaLock  ·  metalock.app", out.width / 2, footerY);

                const filename = isPremade
                    ? `MetaLock_${currentRank.replace(/\s+/g, "_")}_TierList.png`
                    : "MetaLock_Custom_TierList.png";

                const link = document.createElement("a");
                link.download = filename;
                link.href = out.toDataURL("image/png");
                link.click();
            }).catch(() => {
                if (watermark && origWm !== null) watermark.style.display = origWm;
                alert("Couldn't capture the tier list.");
            }).finally(() => {
                if (btn) {
                    btn.textContent = isPremade ? "⬇ Save" : "⬇ Save Image";
                    btn.disabled = false;
                }
            });
        }

        if (typeof html2canvas !== "undefined") {
            runCapture();
        } else {
            const script = document.createElement("script");
            script.src = "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js";
            script.onload  = runCapture;
            script.onerror = () => {
                alert("Couldn't load the capture library.");
                if (btn) {
                    btn.textContent = isPremade ? "⬇ Save" : "⬇ Save Image";
                    btn.disabled = false;
                }
            };
            document.head.appendChild(script);
        }
    }

    document.addEventListener("DOMContentLoaded", () => {
        loadAll();

        TIER_KEYS.forEach(t => {
            const c = document.getElementById(`tier-${t}-brawlers`);
            if (c) c.dataset.dropzone = t;
        });

        buildRankIcons();
        buildModeBar();
        buildPool();
        setupDropZones();
    });

})();