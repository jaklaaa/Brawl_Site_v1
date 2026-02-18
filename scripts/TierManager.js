(function () {
    "use strict";

    const TIER_KEYS = ["S", "A", "B", "C", "D", "F"];

    const LAST_UPDATED = {
        "Trophies": "2026-02-07",
        "Brawl Arena": "2026-02-18",
        "Diamond": "2026-02-07",
        "Mythic": "2026-02-07",
        "Legendary": "2026-02-07",
        "Masters": "2026-02-07",
        "Pro": "2026-02-07",
    };

    // ── State ────────────────────────────────────────────────────────────────
    let currentRank = RANKS[0].key;
    let currentMode = "premade";

    let draggedId  = null;
    let dragSource = null;
    let touchClone = null;

    // ── Shared custom state ──────────────────────────────────────────────────
    let sharedCustom = null;

    function getSharedCustomState() {
        if (!sharedCustom) {
            sharedCustom = { S:[], A:[], B:[], C:[], D:[], F:[], pool: BRAWLERS.map(b => b.id) };
        }
        return sharedCustom;
    }

    // ── Persistence ──────────────────────────────────────────────────────────
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

    // ── Helpers ──────────────────────────────────────────────────────────────
    function getBrawler(id) { return BRAWLERS.find(b => b.id === id); }

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

        return card;
    }

    // ── Last Updated label ───────────────────────────────────────────────────
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
            if (dateStr) {
                const d = new Date(dateStr);
                const formatted = d.toLocaleDateString("en-GB", { day:"numeric", month:"long", year:"numeric" });
                label.textContent = `Last updated: ${formatted}`;
            } else {
                label.textContent = "Last updated: —";
            }
            label.style.display = "";
        } else {
            label.style.display = "none";
        }
    }

    // ── Render ───────────────────────────────────────────────────────────────
    function render() {
        const editable    = (currentMode === "custom");
        const poolSection = document.getElementById("brawler-pool-section");

        if (editable) {
            const state = getSharedCustomState();
            TIER_KEYS.forEach(t => {
                const c = document.getElementById(`tier-${t}-brawlers`);
                if (!c) return;
                c.innerHTML = "";
                state[t].forEach(id => { const card = makeCard(id, t, true); if (card) c.appendChild(card); });
            });
            const pool = document.getElementById("brawler-pool");
            if (pool) {
                pool.innerHTML = "";
                state.pool.forEach(id => { const card = makeCard(id, "pool", true); if (card) pool.appendChild(card); });
            }
            if (poolSection) poolSection.style.display = "";
        } else {
            const premade = PREMADE_TIERS[currentRank] || {};
            TIER_KEYS.forEach(t => {
                const c = document.getElementById(`tier-${t}-brawlers`);
                if (!c) return;
                c.innerHTML = "";
                (premade[t] || []).forEach(id => { const card = makeCard(id, t, false); if (card) c.appendChild(card); });
            });
            if (poolSection) poolSection.style.display = "none";
        }

        updateLastUpdatedLabel();
    }

    // ── Drag & Drop ──────────────────────────────────────────────────────────
    function moveBrawler(id, from, to) {
        if (!id || from === to) return;
        const state = getSharedCustomState();
        if (from === "pool") state.pool = state.pool.filter(x => x !== id);
        else if (TIER_KEYS.includes(from)) state[from] = state[from].filter(x => x !== id);
        if (to === "pool") state.pool.push(id);
        else if (TIER_KEYS.includes(to)) state[to].push(id);
        render();
        saveAll();
    }

    function setupDropZones() {
        document.querySelectorAll("[data-dropzone]").forEach(zone => {
            zone.addEventListener("dragover",  e => { e.preventDefault(); zone.classList.add("drag-over"); });
            zone.addEventListener("dragleave", () => zone.classList.remove("drag-over"));
            zone.addEventListener("drop", e => {
                e.preventDefault();
                zone.classList.remove("drag-over");
                if (currentMode === "custom") moveBrawler(draggedId, dragSource, zone.dataset.dropzone);
            });
        });
    }

    function onDragStart(e) {
        draggedId  = e.currentTarget.dataset.id;
        dragSource = e.currentTarget.dataset.zone;
        setTimeout(() => e.currentTarget.classList.add("dragging"), 0);
        e.dataTransfer.effectAllowed = "move";
    }
    function onDragEnd(e) {
        e.currentTarget.classList.remove("dragging");
        draggedId = dragSource = null;
    }

    function onTouchStart(e) {
        const card = e.currentTarget;
        draggedId  = card.dataset.id;
        dragSource = card.dataset.zone;
        const rect = card.getBoundingClientRect();
        touchClone = card.cloneNode(true);
        Object.assign(touchClone.style, {
            position:"fixed", pointerEvents:"none", opacity:"0.8", zIndex:"9999",
            width: rect.width+"px", height: rect.height+"px",
            left: rect.left+"px", top: rect.top+"px",
        });
        document.body.appendChild(touchClone);
    }
    function onTouchMove(e) {
        e.preventDefault();
        if (!touchClone) return;
        const t = e.touches[0];
        touchClone.style.left = (t.clientX - 32) + "px";
        touchClone.style.top  = (t.clientY - 32) + "px";
    }
    function onTouchEnd(e) {
        if (touchClone) { touchClone.remove(); touchClone = null; }
        const t  = e.changedTouches[0];
        const el = document.elementFromPoint(t.clientX, t.clientY);
        const dz = el?.closest("[data-dropzone]");
        if (dz && currentMode === "custom") moveBrawler(draggedId, dragSource, dz.dataset.dropzone);
        draggedId = dragSource = null;
    }

    // ── Rank icons ───────────────────────────────────────────────────────────
    function buildRankIcons() {
        const grid  = document.getElementById("rankGrid");
        const title = document.getElementById("rankMainTitle");
        if (!grid) return;

        RANKS.forEach((rank) => {
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

    // ── Mode bar ─────────────────────────────────────────────────────────────
    function buildModeBar() {
        if (document.getElementById("modeBar")) return;
        const bar = document.createElement("div");
        bar.id = "modeBar";
        bar.innerHTML = `
            <div class="mode-bar-inner">
                <button class="mode-btn mode-active" id="btnPremade">Ranked</button>
                <button class="mode-btn" id="btnCustom">✏ Create Your Own</button>
            </div>
            <p class="custom-mode-note" id="customModeNote" style="display:none">
                Drag brawlers between tiers. Your list is shared across all ranks and saved automatically.
            </p>
        `;
        const tierList = document.querySelector(".custom-tier-list");
        if (tierList) tierList.after(bar);

        document.getElementById("btnPremade").addEventListener("click", () => setMode("premade"));
        document.getElementById("btnCustom").addEventListener("click",  () => setMode("custom"));
    }

    function setMode(mode) {
        currentMode = mode;
        render();
        document.getElementById("btnPremade")?.classList.toggle("mode-active", mode === "premade");
        document.getElementById("btnCustom")?.classList.toggle("mode-active",  mode === "custom");
        const note = document.getElementById("customModeNote");
        if (note) note.style.display = mode === "custom" ? "" : "none";
    }

    // ── Pool ─────────────────────────────────────────────────────────────────
    function buildPool() {
        if (document.getElementById("brawler-pool-section")) return;
        const section = document.createElement("div");
        section.id = "brawler-pool-section";
        section.innerHTML = `
            <div class="pool-header">
                <span class="pool-title">Unranked Brawlers</span>
                <div style="display:flex;gap:8px;">
                    <button class="download-btn" id="downloadBtn">⬇ Save Image</button>
                    <button class="reset-btn" id="resetBtn">Reset</button>
                </div>
            </div>
            <div class="brawler-pool" id="brawler-pool" data-dropzone="pool"></div>
        `;
        document.getElementById("modeBar")?.after(section);

        document.getElementById("resetBtn").addEventListener("click", () => {
            sharedCustom = {
                S:[], A:[], B:[], C:[], D:[], F:[],
                pool: BRAWLERS.map(b => b.id),
            };
            render();
            saveAll();
        });

        document.getElementById("downloadBtn").addEventListener("click", downloadTierList);
    }

    // ── Download ─────────────────────────────────────────────────────────────
    function downloadTierList() {
        const btn = document.getElementById("downloadBtn");
        btn.textContent = "Capturing...";
        btn.disabled = true;

        function runCapture() {
            const target = document.querySelector(".custom-tier-list");
            const dpr = window.devicePixelRatio || 1;
            html2canvas(target, {
                backgroundColor: "#12131a",
                scale: dpr * 2,        
                useCORS: true,
                allowTaint: false,
                logging: false,
                onclone: (_doc, el) => {
                    el.querySelectorAll("img").forEach(img => {
                        img.style.imageRendering = "auto";
                    });
                },
            }).then(canvas => {
                const out = document.createElement("canvas");
                out.width  = canvas.width;
                out.height = canvas.height;
                out.style.width  = canvas.width  / dpr + "px";
                out.style.height = canvas.height / dpr + "px";
                const ctx = out.getContext("2d");
                ctx.imageSmoothingEnabled = true;
                ctx.imageSmoothingQuality = "high";
                ctx.scale(dpr, dpr);
                ctx.drawImage(canvas, 0, 0, canvas.width / dpr, canvas.height / dpr);

                const link = document.createElement("a");
                link.download = "TierList.png";
                link.href = out.toDataURL("image/png");
                link.click();
            }).catch(() => {
                alert("Couldn't capture the tier list. Make sure portrait images are served from the same domain.");
            }).finally(() => {
                btn.textContent = "⬇ Save Image";
                btn.disabled = false;
            });
        }

        if (typeof html2canvas !== "undefined") {
            runCapture();
        } else {
            const script = document.createElement("script");
            script.src = "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js";
            script.onload  = runCapture;
            script.onerror = () => {
                alert("Couldn't load the capture library. Check your internet connection.");
                btn.textContent = "⬇ Save Image";
                btn.disabled = false;
            };
            document.head.appendChild(script);
        }
    }

    // ── Theme ────────────────────────────────────────────────────────────────
    function setupTheme() {
        const sel    = document.getElementById("themeSelector");
        const themes = ["theme-dark","theme-light","theme-red","theme-blue"];
        const saved  = localStorage.getItem("theme");
        if (saved && themes.includes(saved)) {
            themes.forEach(c => document.body.classList.remove(c));
            document.body.classList.add(saved);
            if (sel) sel.value = saved;
        }
        if (!sel) return;
        sel.addEventListener("change", function () {
            themes.forEach(c => document.body.classList.remove(c));
            document.body.classList.add(this.value);
            localStorage.setItem("theme", this.value);
        });
    }

    // ── Init ─────────────────────────────────────────────────────────────────
    document.addEventListener("DOMContentLoaded", () => {
        setupTheme();
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