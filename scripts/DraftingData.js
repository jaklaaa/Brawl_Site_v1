/**
 * draftingData.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Depends on brawlerData.js (BRAWLERS, PREMADE_TIERS, RANKS, portraitUrl,
 * rankLogoUrl). Must be loaded AFTER brawlerData.js.
 *
 * Meta scores are derived live from PREMADE_TIERS so they stay in sync.
 * Only roles, counters, and map data need manual upkeep here.
 * ─────────────────────────────────────────────────────────────────────────────
 */

// ── Tier → raw meta score ─────────────────────────────────────────────────────
const TIER_SCORE = { S: 10, A: 8, B: 6, C: 4, D: 2, F: 0 };

/**
 * Returns the meta score for a brawler in a specific rank tier.
 * Does a case-insensitive id search to handle typos in PREMADE_TIERS.
 */
function metaForRank(brawlerId, rankKey) {
    const tiers = PREMADE_TIERS[rankKey];
    if (!tiers) return 5;
    const norm = brawlerId.toLowerCase().trim();
    for (const [tier, ids] of Object.entries(tiers)) {
        if ((ids || []).some(id => id.toLowerCase().trim() === norm)) {
            return TIER_SCORE[tier] ?? 5;
        }
    }
    return 5;
}

/**
 * Returns the tier letter (S/A/B/C/D/F) for a brawler in a given rank.
 */
function tierLabelForRank(brawlerId, rankKey) {
    const tiers = PREMADE_TIERS[rankKey];
    if (!tiers) return "?";
    const norm = brawlerId.toLowerCase().trim();
    for (const [tier, ids] of Object.entries(tiers)) {
        if ((ids || []).some(id => id.toLowerCase().trim() === norm)) return tier;
    }
    return "?";
}

// ── Brawler roles ─────────────────────────────────────────────────────────────
// Used to compute map synergy bonuses.
const BRAWLER_ROLES = {
    "shelly":        ["fighter", "skirmisher"],
    "nita":          ["fighter", "support"],
    "colt":          ["sharpshooter"],
    "bull":          ["heavyweight"],
    "brock":         ["sharpshooter"],
    "el-primo":      ["heavyweight"],
    "barley":        ["thrower", "support"],
    "poco":          ["support"],
    "jessie":        ["fighter", "support"],
    "dynamike":      ["thrower"],
    "rico":          ["sharpshooter"],
    "bo":            ["sharpshooter", "support"],
    "mortis":        ["assassin"],
    "spike":         ["sharpshooter", "controller"],
    "crow":          ["assassin", "fighter"],
    "piper":         ["sharpshooter"],
    "pam":           ["heavyweight", "support"],
    "tara":          ["fighter", "support"],
    "darryl":        ["heavyweight", "fighter"],
    "penny":         ["fighter", "support"],
    "frank":         ["heavyweight"],
    "leon":          ["assassin"],
    "gene":          ["support", "controller"],
    "carl":          ["fighter"],
    "rosa":          ["heavyweight"],
    "bibi":          ["fighter", "controller"],
    "tick":          ["thrower"],
    "8-bit":         ["sharpshooter", "support"],
    "sandy":         ["controller", "support"],
    "emz":           ["fighter", "controller"],
    "bea":           ["sharpshooter"],
    "max":           ["support", "fighter"],
    "mr. p":         ["support", "controller"],
    "jacky":         ["heavyweight"],
    "sprout":        ["thrower", "support"],
    "gale":          ["support", "controller"],
    "nani":          ["sharpshooter"],
    "surge":         ["fighter", "skirmisher"],
    "colette":       ["fighter"],
    "amber":         ["controller", "fighter"],
    "lou":           ["controller", "sharpshooter"],
    "byron":         ["support", "sharpshooter"],
    "edgar":         ["fighter", "assassin"],
    "ruffs":         ["support"],
    "stu":           ["fighter", "skirmisher"],
    "belle":         ["sharpshooter"],
    "squeak":        ["thrower", "controller"],
    "buzz":          ["fighter", "assassin"],
    "griff":         ["fighter", "sharpshooter"],
    "ash":           ["heavyweight", "fighter"],
    "meg":           ["heavyweight", "fighter"],
    "lola":          ["fighter", "skirmisher"],
    "grom":          ["thrower"],
    "fang":          ["fighter", "assassin"],
    "eve":           ["sharpshooter", "fighter"],
    "janet":         ["sharpshooter", "fighter"],
    "bonnie":        ["sharpshooter", "fighter"],
    "otis":          ["controller", "fighter"],
    "sam":           ["heavyweight", "fighter"],
    "gus":           ["support"],
    "buster":        ["heavyweight", "support"],
    "chester":       ["fighter", "skirmisher"],
    "gray":          ["support", "controller"],
    "mandy":         ["sharpshooter"],
    "r-t":           ["fighter", "controller"],
    "willow":        ["controller"],
    "maisie":        ["sharpshooter"],
    "hank":          ["heavyweight"],
    "cordelius":     ["assassin", "controller"],
    "doug":          ["support"],
    "pearl":         ["fighter"],
    "chuck":         ["fighter", "skirmisher"],
    "charlie":       ["controller", "fighter"],
    "mico":          ["assassin"],
    "kit":           ["support", "assassin"],
    "larry-lawrie":  ["fighter", "sharpshooter"],
    "angelo":        ["sharpshooter", "support"],
    "melodie":       ["fighter", "skirmisher"],
    "lily":          ["assassin", "support"],
    "draco":         ["heavyweight", "fighter"],
    "berry":         ["support", "fighter"],
    "clancy":        ["fighter", "skirmisher"],
    "moe":           ["fighter", "skirmisher"],
    "kenji":         ["fighter", "assassin"],
    "juju":          ["controller", "support"],
    "shade":         ["assassin", "fighter"],
    "meeple":        ["sharpshooter", "controller"],
    "ollie":         ["fighter", "controller"],
    "finx":          ["support", "controller"],
    "lumi":          ["support"],
    "kaze":          ["fighter", "assassin"],
    "jea-yong":      ["fighter"],
    "alli":          ["fighter", "support"],
    "trunk":         ["heavyweight"],
    "mina":          ["sharpshooter", "fighter"],
    "ziggy":         ["thrower"],
    "gigi":          ["sharpshooter"],
    "pierce":        ["sharpshooter", "heavyweight"],
    "glowbert":      ["fighter", "controller"],
};

function getRoles(brawlerId) {
    return BRAWLER_ROLES[brawlerId.toLowerCase()] || ["fighter"];
}

// ── Counter matrix ────────────────────────────────────────────────────────────
// COUNTERS[A][B] = bonus score for brawler A when brawler B is on the enemy team.
// 0.5 = slight edge · 1.5 = solid counter · 2.5 = hard counter
const COUNTERS = {
    "mortis":      { "barley":2.0, "dynamike":2.0, "sprout":1.5, "tick":1.5, "squeak":1.5, "ziggy":1.5 },
    "edgar":       { "barley":1.5, "dynamike":1.5, "sprout":1.5, "tick":1.0 },
    "fang":        { "barley":1.5, "dynamike":1.5, "sprout":1.5, "tick":1.0, "squeak":1.0 },
    "mico":        { "barley":1.5, "dynamike":1.5, "sprout":1.5 },
    "kenji":       { "mortis":1.5, "edgar":1.5, "crow":1.0 },
    "kaze":        { "mortis":2.0, "edgar":2.0, "mico":2.0, "fang":2.0, "leon":1.5, "shade":1.5 },
    "spike":       { "el-primo":2.0, "bull":2.0, "rosa":1.5, "frank":1.5, "trunk":1.5, "hank":1.5 },
    "angelo":      { "el-primo":2.0, "bull":1.5, "rosa":1.5, "frank":1.5, "trunk":1.5 },
    "pierce":      { "el-primo":2.0, "bull":2.0, "frank":1.5, "rosa":1.5, "trunk":1.5 },
    "crow":        { "pam":1.5, "poco":1.5, "byron":1.5, "frank":1.0, "buster":1.0 },
    "sandy":       { "brock":1.5, "colt":1.5, "nani":1.5, "mina":1.5, "piper":1.5 },
    "leon":        { "barley":1.5, "dynamike":1.5, "tick":1.5, "squeak":1.0 },
    "shelly":      { "rico":1.5, "dynamike":1.0 },
    "bull":        { "brock":1.5, "colt":1.5, "rico":1.5, "nani":1.5, "piper":1.5, "mina":1.5 },
    "el-primo":    { "shelly":1.0, "edgar":1.0, "mico":1.0 },
    "barley":      { "el-primo":1.0, "rosa":1.0, "bull":1.0, "frank":1.0, "trunk":1.0 },
    "poco":        { "crow":1.5, "spike":1.0 },
    "pam":         { "mortis":1.5, "edgar":1.5, "leon":1.0, "mico":1.0 },
    "gale":        { "mortis":1.5, "edgar":1.5, "fang":1.0, "mico":1.0 },
    "frank":       { "pam":1.0, "jessie":1.0, "buster":1.0 },
    "bibi":        { "edgar":1.5, "mortis":1.0, "mico":1.0 },
    "max":         { "crow":1.0, "leon":1.0 },
    "sprout":      { "colt":1.0, "brock":1.0, "rico":1.0 },
    "byron":       { "mortis":1.5, "edgar":1.5, "crow":1.0 },
    "buzz":        { "leon":1.5, "mortis":1.0, "crow":1.0, "mico":1.0 },
    "cordelius":   { "colt":1.5, "brock":1.5, "sandy":1.5, "spike":1.5, "nani":1.5 },
    "kit":         { "mortis":1.5, "edgar":1.5, "leon":1.0, "mico":1.0 },
    "draco":       { "frank":1.5, "el-primo":1.5, "bull":1.5, "trunk":1.5 },
    "melodie":     { "barley":1.5, "dynamike":1.5, "tick":1.5 },
    "lily":        { "brock":1.5, "colt":1.5, "nani":1.5, "mina":1.5 },
    "gray":        { "mortis":1.0, "edgar":1.0, "leon":1.0 },
    "emz":         { "bull":1.5, "el-primo":1.5, "frank":1.0, "rosa":1.0 },
    "otis":        { "pam":1.5, "poco":1.5, "byron":1.0 },
    "charlie":     { "mortis":1.5, "edgar":1.5, "fang":1.5, "mico":1.5 },
    "rico":        { "barley":1.0, "dynamike":1.0 },
    "mina":        { "mortis":1.5, "edgar":1.5, "mico":1.5 },
    "juju":        { "mortis":1.5, "edgar":1.5, "fang":1.5 },
    "glowbert":    { "el-primo":1.5, "bull":1.5, "frank":1.0 },
    "ollie":       { "shelly":1.0, "bibi":1.0, "edgar":1.0 },
    "shade":       { "leon":1.0, "mortis":1.0, "mico":1.0 },
    "meeple":      { "barley":1.0, "dynamike":1.0, "sprout":1.0 },
};

// ── Maps ──────────────────────────────────────────────────────────────────────
// classWeights: multipliers per role. 1.0 = neutral.
// imageFile: filename inside ../assets/maps/
const DRAFT_MAPS = [
    // Gem Grab
    { id:"gg-double-swoosh",    name:"Double Swoosh",    mode:"Gem Grab",   imageFile:"double-swoosh.jpg",
      classWeights:{ thrower:1.3, support:1.3, controller:1.2, sharpshooter:1.0, fighter:0.9, heavyweight:0.8, assassin:0.7, skirmisher:0.8 } },
    { id:"gg-undermine",        name:"Undermine",         mode:"Gem Grab",   imageFile:"undermine.jpg",
      classWeights:{ controller:1.3, support:1.2, thrower:1.2, fighter:1.0, sharpshooter:0.9, heavyweight:0.9, assassin:0.8, skirmisher:0.8 } },
    { id:"gg-minecart",         name:"Minecart Madness",  mode:"Gem Grab",   imageFile:"minecart-madness.jpg",
      classWeights:{ support:1.3, controller:1.2, fighter:1.1, thrower:1.0, sharpshooter:1.0, heavyweight:0.9, assassin:0.8, skirmisher:0.9 } },
    { id:"gg-gems-n-roses",     name:"Gems N' Roses",     mode:"Gem Grab",   imageFile:"gems-n-roses.jpg",
      classWeights:{ thrower:1.2, support:1.2, controller:1.1, sharpshooter:1.0, fighter:0.9, heavyweight:0.8, assassin:0.8, skirmisher:0.9 } },
    // Brawl Ball
    { id:"bb-penalty-kick",     name:"Penalty Kick",      mode:"Brawl Ball", imageFile:"penalty-kick.jpg",
      classWeights:{ heavyweight:1.4, fighter:1.3, assassin:1.2, skirmisher:1.2, controller:1.1, support:1.0, sharpshooter:0.8, thrower:0.7 } },
    { id:"bb-pinball-dreams",   name:"Pinball Dreams",    mode:"Brawl Ball", imageFile:"pinball-dreams.jpg",
      classWeights:{ sharpshooter:1.3, fighter:1.2, controller:1.1, heavyweight:1.0, support:1.0, thrower:0.9, assassin:0.9, skirmisher:1.0 } },
    { id:"bb-backyard-bowl",    name:"Backyard Bowl",      mode:"Brawl Ball", imageFile:"backyard-bowl.jpg",
      classWeights:{ fighter:1.3, heavyweight:1.2, thrower:1.1, assassin:1.1, skirmisher:1.1, controller:1.0, sharpshooter:0.9, support:0.9 } },
    { id:"bb-super-beach",      name:"Super Beach Brawl", mode:"Brawl Ball", imageFile:"super-beach.jpg",
      classWeights:{ heavyweight:1.3, fighter:1.2, skirmisher:1.2, controller:1.1, support:1.0, sharpshooter:0.9, thrower:0.8, assassin:1.0 } },
    // Heist
    { id:"he-safe-zone",        name:"Safe Zone",          mode:"Heist",      imageFile:"safe-zone.jpg",
      classWeights:{ sharpshooter:1.4, thrower:1.3, fighter:1.1, heavyweight:1.0, assassin:1.0, controller:0.9, support:0.8, skirmisher:1.0 } },
    { id:"he-kaboom-canyon",    name:"Kaboom Canyon",      mode:"Heist",      imageFile:"kaboom-canyon.jpg",
      classWeights:{ thrower:1.5, sharpshooter:1.3, fighter:1.0, heavyweight:1.0, assassin:1.0, controller:0.8, support:0.7, skirmisher:0.9 } },
    { id:"he-bridge-too-far",   name:"Bridge Too Far",     mode:"Heist",      imageFile:"bridge-too-far.jpg",
      classWeights:{ thrower:1.4, sharpshooter:1.2, fighter:1.1, controller:1.0, heavyweight:0.9, assassin:0.9, support:0.8, skirmisher:1.0 } },
    // Bounty
    { id:"bo-shooting-star",    name:"Shooting Star",      mode:"Bounty",     imageFile:"shooting-star.jpg",
      classWeights:{ sharpshooter:1.5, controller:1.2, support:1.1, fighter:1.0, thrower:1.0, heavyweight:0.8, assassin:0.7, skirmisher:0.9 } },
    { id:"bo-excel",            name:"Excel",               mode:"Bounty",     imageFile:"excel.jpg",
      classWeights:{ sharpshooter:1.4, controller:1.2, support:1.1, thrower:1.0, fighter:0.9, heavyweight:0.8, assassin:0.7, skirmisher:0.9 } },
    // Knockout
    { id:"ko-close-call",       name:"Close Call",          mode:"Knockout",   imageFile:"close-call.jpg",
      classWeights:{ fighter:1.3, assassin:1.3, skirmisher:1.3, heavyweight:1.2, controller:1.1, sharpshooter:1.0, support:0.9, thrower:0.8 } },
    { id:"ko-new-horizons",     name:"New Horizons",        mode:"Knockout",   imageFile:"new-horizons.jpg",
      classWeights:{ sharpshooter:1.3, controller:1.2, support:1.1, fighter:1.0, thrower:1.0, heavyweight:0.9, assassin:0.9, skirmisher:1.0 } },
    { id:"ko-goldarm-gulch",    name:"Goldarm Gulch",       mode:"Knockout",   imageFile:"goldarm-gulch.jpg",
      classWeights:{ sharpshooter:1.4, controller:1.2, fighter:1.1, thrower:1.0, heavyweight:0.9, support:0.9, assassin:0.8, skirmisher:1.0 } },
    // Hot Zone
    { id:"hz-open-business",    name:"Open Business",       mode:"Hot Zone",   imageFile:"open-business.jpg",
      classWeights:{ support:1.4, controller:1.3, fighter:1.2, thrower:1.1, heavyweight:1.0, sharpshooter:0.9, assassin:0.8, skirmisher:0.9 } },
    { id:"hz-open-bar",         name:"Open Bar",            mode:"Hot Zone",   imageFile:"open-bar.jpg",
      classWeights:{ support:1.3, controller:1.3, fighter:1.2, thrower:1.0, heavyweight:1.0, sharpshooter:0.9, assassin:0.8, skirmisher:0.9 } },
    // Wipeout
    { id:"wo-hard-rock-mine",   name:"Hard Rock Mine",      mode:"Wipeout",    imageFile:"hard-rock-mine.jpg",
      classWeights:{ sharpshooter:1.3, controller:1.2, fighter:1.1, thrower:1.0, support:1.0, heavyweight:1.0, assassin:0.9, skirmisher:1.0 } },
    // Showdown
    { id:"sd-skull-creek",      name:"Skull Creek",         mode:"Showdown",   imageFile:"skull-creek.jpg",
      classWeights:{ fighter:1.2, assassin:1.2, heavyweight:1.1, skirmisher:1.1, controller:1.0, sharpshooter:1.0, thrower:0.9, support:0.8 } },
    { id:"sd-feast-famine",     name:"Feast or Famine",     mode:"Showdown",   imageFile:"feast-or-famine.jpg",
      classWeights:{ thrower:1.4, controller:1.2, sharpshooter:1.1, fighter:1.0, heavyweight:0.9, assassin:0.9, support:0.8, skirmisher:1.0 } },
];

// ── Rank scoring profiles ─────────────────────────────────────────────────────
// metaWeight:    how much the brawler's tier placement matters (0–1)
// counterWeight: how much counter-pick logic matters
const DRAFT_RANK_PROFILES = [
    { id:"Trophies",    label:"Trophies",    range:"0 – 499",     metaWeight:0.5, counterWeight:0.6 },
    { id:"Brawl Arena", label:"Brawl Arena", range:"Arena",       metaWeight:0.6, counterWeight:0.8 },
    { id:"Diamond",     label:"Diamond",     range:"Diamond",     metaWeight:0.7, counterWeight:0.9 },
    { id:"Mythic",      label:"Mythic",      range:"Mythic",      metaWeight:0.8, counterWeight:1.1 },
    { id:"Legendary",   label:"Legendary",   range:"Legendary",   metaWeight:0.9, counterWeight:1.2 },
    { id:"Masters",     label:"Masters",     range:"Masters",     metaWeight:1.0, counterWeight:1.4 },
    { id:"Pro",         label:"Pro",         range:"Pro League",  metaWeight:1.0, counterWeight:1.5 },
];

// Map image base path
function draftMapImageUrl(filename) {
    return `../assets/maps/${filename}`;
}