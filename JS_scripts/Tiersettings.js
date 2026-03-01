(function () {
    "use strict";

    const THEMES      = ["theme-dark", "theme-light", "theme-red", "theme-blue"];
    const LS_SETTINGS = "bsTierSettings_v1";

    let settings = {
        theme:    "theme-dark",
        cardSize: 64,
        names:    false,
        compact:  false,
        tooltips: true,
    };

    function loadSettings() {
        try {
            const saved = JSON.parse(localStorage.getItem(LS_SETTINGS));
            if (saved && typeof saved === "object") {
                settings = Object.assign(settings, saved);
            }
        } catch {}
    }

    function saveSettings() {
        try { localStorage.setItem(LS_SETTINGS, JSON.stringify(settings)); } catch {}
    }

    function injectStyle(id, css) {
        let el = document.getElementById(id);
        if (!el) {
            el = document.createElement("style");
            el.id = id;
            document.head.appendChild(el);
        }
        el.textContent = css;
    }

    function applyTheme(theme) {
        THEMES.forEach(t => document.body.classList.remove(t));
        document.body.classList.add(theme);
    }

    function applyCardSize(px) {
        injectStyle("cardSizeStyle", `
            .brawler-card { width:${px}px !important; height:${px}px !important; }
        `);
    }

    function applyNames(on) {
        injectStyle("namesStyle", on ? `
            .brawler-card { position: relative; }
            .brawler-card::before {
                content: attr(title);
                position: absolute;
                bottom: 0; left: 0; right: 0;
                padding: 3px 2px 3px;
                font-family: 'Orbitron', sans-serif;
                font-size: 14px;
                font-weight: 700;
                letter-spacing: 0.2px;
                color: #fff;
                text-align: center;
                line-height: 1.2;
                word-break: break-word;
                pointer-events: none;
                z-index: 2;
                background: linear-gradient(transparent, rgba(0,0,0,0.72) 40%);
                border-radius: 0 0 8px 8px;
                text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;
            }
        ` : "");
    }

    function applyTooltips(on) {
        window._metalockTooltipsEnabled = on;
    }

    function applyCompact(on) {
        const slider = document.getElementById("cardSizeSlider");
        if (on) {
            applyCardSize(44);
            if (slider) slider.value = 44;
        } else {
            applyCardSize(settings.cardSize);
            if (slider) slider.value = settings.cardSize;
        }
    }

    function syncDrawerUI() {
        document.querySelectorAll(".theme-swatch").forEach(el =>
            el.classList.toggle("active", el.dataset.theme === settings.theme));

        const slider = document.getElementById("cardSizeSlider");
        if (slider) slider.value = settings.compact ? 44 : settings.cardSize;

        const tog = id => document.getElementById(id);
        if (tog("toggleNames"))    tog("toggleNames").checked    = settings.names;
        if (tog("toggleCompact"))  tog("toggleCompact").checked  = settings.compact;
        if (tog("toggleTooltips")) tog("toggleTooltips").checked = settings.tooltips;
    }

    function applyAll() {
        applyTheme(settings.theme);
        applyNames(settings.names);
        applyTooltips(settings.tooltips);
        if (settings.compact) {
            applyCompact(true);
        } else {
            applyCardSize(settings.cardSize);
        }
        syncDrawerUI();
    }

    const RARITY_LABELS = {
        "starter":        "Starter",
        "rare":           "Rare",
        "super rare":     "Super Rare",
        "epic":           "Epic",
        "mythic":         "Mythic",
        "legendary":      "Legendary",
        "ultra legendary":"Ultra Legendary",
    };

    const RARITY_CLASSES = {
        "starter":        "rarity-starter",
        "rare":           "rarity-rare",
        "super rare":     "rarity-super-rare",
        "epic":           "rarity-epic",
        "mythic":         "rarity-mythic",
        "legendary":      "rarity-legendary",
        "ultra legendary":"rarity-ultra-legendary",
    };

    function initTooltip() {
        const tip        = document.getElementById("brawlerTooltip");
        const ttPortrait = document.getElementById("ttPortrait");
        const ttName     = document.getElementById("ttName");
        const ttRarity   = document.getElementById("ttRarity");
        const ttTierVal  = document.getElementById("ttTierVal");
        if (!tip) return;

        let hideTimer = null;

        function showTooltip(card, e) {
            if (!window._metalockTooltipsEnabled) return;
            clearTimeout(hideTimer);

            const brawlerId = card.dataset.id;
            const zone      = card.dataset.zone;

            const brawler = (typeof BRAWLERS !== "undefined")
                ? BRAWLERS.find(b => b.id === brawlerId)
                : null;
            if (!brawler) return;

            const tierLabel = (zone && zone !== "pool") ? zone : "—";

            ttPortrait.src = (typeof portraitUrl === "function")
                ? portraitUrl(brawler.key)
                : `../assets/Portraits/${brawler.key}_Portrait.jpg`;
            ttPortrait.alt = brawler.name;

            ttName.textContent = brawler.name;

            const rarityKey = (brawler.rarity || "").toLowerCase();
            ttRarity.textContent  = RARITY_LABELS[rarityKey] || brawler.rarity || "Unknown";
            ttRarity.className    = "tt-rarity " + (RARITY_CLASSES[rarityKey] || "rarity-starter");

            ttTierVal.textContent = tierLabel;

            tip.style.left = e.clientX + "px";
            tip.style.top  = e.clientY + "px";
            tip.classList.add("visible");
        }

        function hideTooltip() {
            hideTimer = setTimeout(() => tip.classList.remove("visible"), 80);
        }

        document.addEventListener("mouseover", e => {
            const card = e.target.closest(".brawler-card");
            if (card) showTooltip(card, e);
        });

        document.addEventListener("mousemove", e => {
            if (!tip.classList.contains("visible")) return;
            const card = e.target.closest(".brawler-card");
            if (!card) return;
            tip.style.left = e.clientX + "px";
            tip.style.top  = e.clientY + "px";
        });

        document.addEventListener("mouseout", e => {
            const card = e.target.closest(".brawler-card");
            if (card) hideTooltip();
        });

        document.addEventListener("dragstart", () => tip.classList.remove("visible"));
    }

    function initDrawer() {
        const gear     = document.getElementById("navGear");
        const drawer   = document.getElementById("settingsDrawer");
        const overlay  = document.getElementById("settingsOverlay");
        const closeBtn = document.getElementById("drawerClose");
        if (!gear || !drawer) return;

        const open  = () => { drawer.classList.add("open");    overlay?.classList.add("visible");    gear.classList.add("open"); };
        const close = () => { drawer.classList.remove("open"); overlay?.classList.remove("visible"); gear.classList.remove("open"); };

        gear.addEventListener("click",     () => drawer.classList.contains("open") ? close() : open());
        overlay?.addEventListener("click", close);
        closeBtn?.addEventListener("click", close);
    }

    function initControls() {
        document.querySelectorAll(".theme-swatch").forEach(el => {
            el.addEventListener("click", () => {
                settings.theme = el.dataset.theme;
                applyTheme(settings.theme);
                document.querySelectorAll(".theme-swatch").forEach(s => s.classList.remove("active"));
                el.classList.add("active");
                saveSettings();
            });
        });

        const slider = document.getElementById("cardSizeSlider");
        if (slider) {
            slider.addEventListener("input", function () {
                settings.cardSize = parseInt(this.value);
                if (settings.compact) {
                    settings.compact = false;
                    const tog = document.getElementById("toggleCompact");
                    if (tog) tog.checked = false;
                }
                applyCardSize(settings.cardSize);
                saveSettings();
            });
        }

        const togNames = document.getElementById("toggleNames");
        if (togNames) {
            togNames.addEventListener("change", function () {
                settings.names = this.checked;
                applyNames(settings.names);
                saveSettings();
            });
        }

        const togCompact = document.getElementById("toggleCompact");
        if (togCompact) {
            togCompact.addEventListener("change", function () {
                settings.compact = this.checked;
                applyCompact(settings.compact);
                saveSettings();
            });
        }

        const togTooltips = document.getElementById("toggleTooltips");
        if (togTooltips) {
            togTooltips.addEventListener("change", function () {
                settings.tooltips = this.checked;
                applyTooltips(settings.tooltips);
                saveSettings();
            });
        }

        const clearBtn = document.getElementById("clearDataBtn");
        if (clearBtn) {
            clearBtn.addEventListener("click", () => {
                if (!confirm("Reset your custom tier list? This cannot be undone.")) return;
                try { localStorage.removeItem("bsTierCustom_v3"); } catch {}
                location.reload();
            });
        }
    }

    function init() {
        loadSettings();
        applyAll();
        initDrawer();
        initControls();
        initTooltip();
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }

})();