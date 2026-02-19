/**
 * tierSettings.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Handles the glass nav settings drawer on the Tier Lists page.
 * Shared localStorage key "bsTierSettings_v1" with index.html so theme/accent
 * persist across pages.
 * ─────────────────────────────────────────────────────────────────────────────
 */
(function () {
    "use strict";

    const THEMES     = ["theme-dark", "theme-light", "theme-red", "theme-blue"];
    const LS_SETTINGS = "bsTierSettings_v1";

    // Default settings — merged over with anything saved
    let settings = {
        theme:    "theme-dark",
        accent:   "#5ddcff",
        cardSize: 64,
        names:    false,
        compact:  false,
        tooltips: true,
    };

    // ── Persistence ──────────────────────────────────────────────────────────
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

    // ── Style injection helpers ───────────────────────────────────────────────
    function injectStyle(id, css) {
        let el = document.getElementById(id);
        if (!el) {
            el = document.createElement("style");
            el.id = id;
            document.head.appendChild(el);
        }
        el.textContent = css;
    }

    // ── Apply functions ───────────────────────────────────────────────────────
    function applyTheme(theme) {
        THEMES.forEach(t => document.body.classList.remove(t));
        document.body.classList.add(theme);
    }

    function applyAccent(color) {
        document.documentElement.style.setProperty("--ui-accent", color);
        injectStyle("accentStyle", `
            .pill-toggle input:checked + .pill-track { background:${color}33; border-color:${color}66; }
            .pill-toggle input:checked + .pill-track::after { background:${color}; }
            .size-slider::-webkit-slider-thumb { background:${color}; box-shadow:0 0 8px ${color}88; }
            .size-slider::-moz-range-thumb { background:${color}; }
            .download-btn { color:${color}aa !important; border-color:${color}33 !important; }
            .download-btn:hover { color:${color} !important; border-color:${color}66 !important; background:${color}18 !important; }
        `);
    }

    function applyCardSize(px) {
        injectStyle("cardSizeStyle", `
            .brawler-card { width:${px}px !important; height:${px}px !important; }
        `);
    }

    function applyNames(on) {
        // Overlay the name on top of the image at the bottom, white text + dark outline
        injectStyle("namesStyle", on ? `
            .brawler-card {
                position: relative;
            }
            .brawler-card::before {
                content: attr(title);
                position: absolute;
                bottom: 0;
                left: 0;
                right: 0;
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
                text-shadow:
                    -1px -1px 0 #000, 1px -1px 0 #000,
                    -1px  1px 0 #000, 1px  1px 0 #000;
            }
        ` : "");
    }

    function applyTooltips(on) {
        injectStyle("tooltipStyle", on ? "" : `.brawler-card::after { display:none !important; }`);
    }

    /**
     * Compact toggle.
     * ON  → force cards to 44 px and lock the slider there.
     * OFF → restore to whatever the slider's actual saved cardSize is.
     *       We always read from settings.cardSize, NOT the slider value,
     *       so toggling compact off always brings back the real size.
     */
    function applyCompact(on) {
        const slider = document.getElementById("cardSizeSlider");
        if (on) {
            applyCardSize(44);
            if (slider) slider.value = 44;
        } else {
            applyCardSize(settings.cardSize);      // restore true saved size
            if (slider) slider.value = settings.cardSize;
        }
    }

    // ── Sync drawer UI to current settings ───────────────────────────────────
    function syncDrawerUI() {
        document.querySelectorAll(".theme-swatch").forEach(el =>
            el.classList.toggle("active", el.dataset.theme === settings.theme));

        document.querySelectorAll(".accent-pip").forEach(el =>
            el.classList.toggle("active", el.dataset.accent === settings.accent));

        const slider = document.getElementById("cardSizeSlider");
        if (slider) slider.value = settings.compact ? 44 : settings.cardSize;

        const tog = id => document.getElementById(id);
        if (tog("toggleNames"))    tog("toggleNames").checked   = settings.names;
        if (tog("toggleCompact"))  tog("toggleCompact").checked = settings.compact;
        if (tog("toggleTooltips")) tog("toggleTooltips").checked = settings.tooltips;
    }

    // ── Apply everything ─────────────────────────────────────────────────────
    function applyAll() {
        applyTheme(settings.theme);
        applyAccent(settings.accent);
        applyNames(settings.names);
        applyTooltips(settings.tooltips);

        // compact takes priority over cardSize slider
        if (settings.compact) {
            applyCompact(true);
        } else {
            applyCardSize(settings.cardSize);
        }

        syncDrawerUI();
    }

    // ── Drawer open / close ───────────────────────────────────────────────────
    function initDrawer() {
        const gear     = document.getElementById("navGear");
        const drawer   = document.getElementById("settingsDrawer");
        const overlay  = document.getElementById("settingsOverlay");
        const closeBtn = document.getElementById("drawerClose");
        if (!gear || !drawer) return;

        const open  = () => { drawer.classList.add("open");    overlay?.classList.add("visible");    gear.classList.add("open"); };
        const close = () => { drawer.classList.remove("open"); overlay?.classList.remove("visible"); gear.classList.remove("open"); };

        gear.addEventListener("click",    () => drawer.classList.contains("open") ? close() : open());
        overlay?.addEventListener("click", close);
        closeBtn?.addEventListener("click", close);
    }

    // ── Wire up controls ─────────────────────────────────────────────────────
    function initControls() {
        // Theme swatches
        document.querySelectorAll(".theme-swatch").forEach(el => {
            el.addEventListener("click", () => {
                settings.theme = el.dataset.theme;
                applyTheme(settings.theme);
                document.querySelectorAll(".theme-swatch").forEach(s => s.classList.remove("active"));
                el.classList.add("active");
                saveSettings();
            });
        });

        // Accent pips
        document.querySelectorAll(".accent-pip").forEach(pip => {
            pip.addEventListener("click", () => {
                settings.accent = pip.dataset.accent;
                applyAccent(settings.accent);
                document.querySelectorAll(".accent-pip").forEach(p => p.classList.remove("active"));
                pip.classList.add("active");
                saveSettings();
            });
        });

        // Card size slider
        const slider = document.getElementById("cardSizeSlider");
        if (slider) {
            slider.addEventListener("input", function () {
                settings.cardSize = parseInt(this.value);
                // Moving the slider implies turning compact off
                if (settings.compact) {
                    settings.compact = false;
                    const tog = document.getElementById("toggleCompact");
                    if (tog) tog.checked = false;
                }
                applyCardSize(settings.cardSize);
                saveSettings();
            });
        }

        // Names toggle
        const togNames = document.getElementById("toggleNames");
        if (togNames) {
            togNames.addEventListener("change", function () {
                settings.names = this.checked;
                applyNames(settings.names);
                saveSettings();
            });
        }

        // Compact toggle — bug fix: OFF restores settings.cardSize, not slider value
        const togCompact = document.getElementById("toggleCompact");
        if (togCompact) {
            togCompact.addEventListener("change", function () {
                settings.compact = this.checked;
                applyCompact(settings.compact);
                saveSettings();
            });
        }

        // Tooltips toggle
        const togTooltips = document.getElementById("toggleTooltips");
        if (togTooltips) {
            togTooltips.addEventListener("change", function () {
                settings.tooltips = this.checked;
                applyTooltips(settings.tooltips);
                saveSettings();
            });
        }

        // Clear data button
        const clearBtn = document.getElementById("clearDataBtn");
        if (clearBtn) {
            clearBtn.addEventListener("click", () => {
                if (!confirm("Reset your custom tier list? This cannot be undone.")) return;
                try { localStorage.removeItem("bsTierCustom_v3"); } catch {}
                location.reload();
            });
        }
    }

    // ── Init ─────────────────────────────────────────────────────────────────
    function init() {
        loadSettings();
        applyAll();
        initDrawer();
        initControls();
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }

})();