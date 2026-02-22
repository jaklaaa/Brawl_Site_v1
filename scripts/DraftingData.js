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
const BRAWLER_ROLES = {
    "shelly":        ["Anti-Tank", "Buffied"],
    "nita":          ["Anti-Tank", "Heist Offense", "Spawner"],
    "colt":          ["Anti-Tank", "Heist Offense", "Buffied", "Wallbreak"],
    "bull":          ["Tank"],
    "brock":         ["Sniper", "Wallbreak"],
    "el-primo":      ["Tank"],
    "barley":        ["Controller",],
    "poco":          ["Support", "Buffied"],
    "jessie":        ["Controller", "Heist Offense", "Anti-Group"],
    "dynamike":      ["Anti-Tank"],
    "rico":          ["Anti-Tank", "Buffied", "First Pick"],
    "bo":            ["Controller", "Gem Mid"],
    "mortis":        ["Dive", "Gem Clutcher", "Goal Scorer", "Buffied", "Last Pick"],
    "spike":         ["Controller", "Gem Mid", "Buffied", "First Pick"],
    "crow":          ["Controller", "Anti-Healer", "Gem Mid", "Gem Clutcher", "Heist Offense", "Heist Defense", "First Pick", "Slow Paced"],
    "piper":         ["Sniper"],
    "pam":           ["Controller", "Support", "Gem Mid"],
    "tara":          ["Anti-Aggro", "Gem Mid", "Gem Clutcher", "Keeper", "Spawner", "Anti-Group"],
    "darryl":        ["Dive", "Goal Scorer"],
    "penny":         ["Controller", "Gem Mid", "Heist Offense", "Anti-Group"],
    "frank":         ["Tank", "Cheese", "Buffied", "Wallbreak"],
    "leon":          ["Aggro"],
    "gene":          ["Controller", "Support", "Gem Clutcher", "Slow Paced"],
    "carl":          ["Gem Mid"],
    "rosa":          ["Tank"],
    "bibi":          ["Aggro", "Goal Scorer"],
    "tick":          ["Controller", "Spawner"],
    "8-bit":         ["Anti-Tank", "Heist Offense"],
    "sandy":         ["Anti-Dive", "Controller", "Support", "Keeper"],
    "emz":           ["Controller", "Gem Mid", "Keeper", "Buffied", "First Pick"],
    "bea":           ["Anti-Tank", "Sniper"],
    "max":           ["Aggro", "Support", "Goal Scorer"],
    "mr. p":         ["Controller", "Sniper", "Spawner"],
    "jacky":         ["Tank", "Goal Scorer", "Keeper", "Cheese"],
    "sprout":        ["Controller", "Keeper"],
    "gale":          ["Anti-Dive", "Controller", "Gem Mid", "Keeper"],
    "nani":          ["Anti-Tank", "Sniper"],
    "surge":         ["Anti-Dive", "Gem Clutcher"],
    "colette":       ["Anti-Tank", "Heist Offense", "Slow Paced"],
    "amber":         ["Anti-Aggro", "Controller", "Heist Defense", "Anti-Group"],
    "lou":           ["Anti-Tank", "Anti-Aggro", "Controller"],
    "byron":         ["Support", "Anti-Healer", "Sniper", "Slow Paced"],
    "edgar":         ["Dive", "Goal Scorer"],
    "ruffs":         ["Support", "Gem Mid", "Wallbreak"],
    "stu":           ["Aggro", "Goal Scorer", "Slow Paced"],
    "belle":         ["Sniper", "Anti-Group"],
    "squeak":        ["Controller", "Gem Mid", "Slow Paced",],
    "buzz":          ["Dive", "Gem Clutcher", "Goal Scorer"],
    "griff":         ["Anti-Tank", "Keeper", "Wallbreak"],
    "ash":           ["Anti-Tank", "Spawner"],
    "meg":           ["Tank", "Gem Mid"],
    "lola":          ["Anti-Tank",],
    "grom":          ["Anti-Tank"],
    "fang":          ["Dive", "Gem Clutcher", "Goal Scorer"],
    "eve":           ["Controller", "Spawner"],
    "janet":         ["Controller", "Gem Mid", "Gem Clutcher"],
    "bonnie":        ["Sniper", "Slow Paced"],
    "otis":          ["Anti-Tank", "Anti-Aggro"],
    "sam":           ["Aggro", "Gem Clutcher"],
    "gus":           ["Support", "Sniper", "Gem Mid", "Slow Paced"],
    "buster":        ["Tank", "Support"],
    "chester":       ["Anti-Tank", "Controller"],
    "gray":          ["Support", "Cheese", "Wallbreak", "Slow Paced"],
    "mandy":         ["Sniper", "Slow Paced"],
    "r-t":           ["Anti-Dive", "Sniper", "Heist Defense"],
    "willow":        ["Controller", "Keeper", "Goal Scorer"],
    "maisie":        ["Anti-Aggro", "Keeper", "Slow Paced"],
    "hank":          ["Tank", ],
    "cordelius":     ["Anti-Dive", "Anti-Aggro", "Gem Clutcher", "Heist Offense", "Heist Defense", "Goal Scorer", "Keeper"],
    "doug":          ["Tank", "Healer", "Support", "Cheese"],
    "pearl":         ["Anti-Tank", "Anti-Dive", "Anti-Aggro", "Anti-Healer"],
    "chuck":         ["Dive", "Heist Offense"],
    "charlie":       ["Anti-Dive", "Anti-Aggro", "Gem Clutcher", "Heist Defense", "Goal Scorer", "Keeper", "Spawner"],
    "mico":          ["Dive", "Heist Offense"],
    "kit":           ["Dive", "Support", "Healer", ],
    "larry-lawrie":  ["Controller", "Spawner"],
    "angelo":        ["Sniper", "Slow Paced"],
    "melodie":       ["Dive", "Aggro", "Heist Offense"],
    "lily":          ["Dive", "Gem Clutcher", "Heist Offense", "Last Pick"],
    "draco":         ["Tank", "Cheese"],
    "berry":         ["Healer", "Heist Offense"],
    "clancy":        ["Anti-Tank", "Anti-Aggro"],
    "moe":           ["Dive", "Goal Scorer"],
    "kenji":         ["Dive", "Gem Clutcher", "Goal Scorer", "Last Pick"],
    "juju":          ["Controller", "Spawner"],
    "shade":         ["Dive", "Goal Scorer"],
    "meeple":        ["Controller", "Support", "Gem Mid", "Slow Paced"],
    "ollie":         ["Dive", "Goal Scorer"],
    "finx":          ["Controller", "Support"],
    "lumi":          ["Anti-Tank"],
    "kaze":          ["Dive", "Gem Clutcher", "Heist Offense", "Goal Scorer"],
    "jea-yong":      ["Aggro", "Support", "Healer"],
    "alli":          ["Dive", "Gem Clutcher", "Last Pick"],
    "trunk":         ["Tank", "Last Pick"],
    "mina":          ["Aggro", "Goal Scorer", "Keeper", "Buffied", "First Pick"],
    "ziggy":         ["Controller", "Slow Paced"],
    "gigi":          ["Dive", "Gem Clutcher", "Goal Scorer"],
    "pierce":        ["Sniper", "Buffied", "First Pick", "Slow Paced"],
    "glowbert":      ["Anti-Dive", "Anti-Aggro", "Healer", "Keeper", "Slow Paced"],
};

function getRoles(brawlerId) {
    return BRAWLER_ROLES[brawlerId.toLowerCase()] || ["fighter"];
}

// ── Counter matrix ────────────────────────────────────────────────────────────
// COUNTERS[A][B] = bonus score for brawler A when brawler B is on the enemy team.
// 0.5 = slight edge · 1.5 = solid counter · 2.5 = hard counter
const COUNTERS = {
    "8-bit":     {"belle":2.5, "penny": 2.5, "mandy": 2.0, "piper": 2.0, "squeak": 2.5},
    "alli":      {"bull":2.5, "draco": 2.5, "r-t":2.5, "doug": 2.3, "ash": 2.2},
    "amber":     {"bonnie": 2.5, "carl": 2.5, "crow": 2.0, "piper": 1.5, "belle": 1.3},
    "angelo":    {"kit": 2.5, "jae-yong": 2.3, "piper": 2.3, "max": 2.3, "nani": 2.5},
    "ash":       {"frank": 2.5, "bull": 2.0, "amber": 2.5, "charlie": 1.5, "cordelius": 1.5},


};

// ── Maps ──────────────────────────────────────────────────────────────────────
// classWeights: multipliers per role. 1.0 = neutral.
// imageFile: filename inside ../assets/maps/
const DRAFT_MAPS = [
    // Gem Grab
    { id:"gg-double-swoosh",    
      name:"Double Swoosh",    
      mode:"Gem Grab",   
      imageFile:"Double Swoosh.png",
      classWeights:
        { 
          Tank: 1.1,
          Dive: 1.0,
          Aggro: 1.3,
        } 
        },
  { id:"gg-crystal-arcade",    
      name:"Crystal Arcade",    
      mode:"Gem Grab",   
      imageFile:"Crystal Arcade.png",
      classWeights:
        { 
          Tank: 1.0,
        } 
        },
  { id:"gg-gem-fort",    
      name:"Gem Fort",    
      mode:"Gem Grab",   
      imageFile:"Gem Fort.png",
      classWeights:
        { 
          Tank: 0.8,
        } 
        },
  { id:"gg-hard-rock-mine",    
      name:"Hard Rock Mine",    
      mode:"Gem Grab",   
      imageFile:"Hard Rock Mine.png",
      classWeights:
        { 
          Tank: 0.8,
        } 
        },
  { id:"gg-rustic-arcade",    
      name:"Rustic Arcade",    
      mode:"Gem Grab",   
      imageFile:"Rustic Arcade.png",
      classWeights:
        { 
          Tank: 0.6,
        } 
        },
  { id:"gg-undermine",    
      name:"Undermine",    
      mode:"Gem Grab",   
      imageFile:"Undermine.png",
      classWeights:
        { 
          Tank: 0.9,
        } 
        },
  { id:"gg-bridge-too-far",    
      name:"Bridge Too Far",    
      mode:"Heist",   
      imageFile:"Bridge Too Far.png",
      classWeights:
        { 
          Tank: 0.4,
        } 
        },
  { id:"gg-hot-potato",    
      name:"Hot Potato",    
      mode:"Heist",   
      imageFile:"Hot Potato.png",
      classWeights:
        { 
          Tank: 0.4,
        } 
        },        
  { id:"gg-kaboom-canyon",    
      name:"Kaboom Canyon",    
      mode:"Heist",   
      imageFile:"Kaboom Canyon.png",
      classWeights:
        { 
          Tank: 0.4,
        } 
        },        
  { id:"gg-saze-zonde",    
      name:"Safe Zone",    
      mode:"Heist",   
      imageFile:"Safe Zone.png",
      classWeights:
        { 
          Tank: 0.4,
        } 
        },
  { id:"gg-dry-season",    
      name:"Dry Season",    
      mode:"Bounty",   
      imageFile:"Dry Season.png",
      classWeights:
        { 
          Tank: 0.4,
        } 
        },
  { id:"gg-hideout",    
      name:"Hideout",    
      mode:"Bounty",   
      imageFile:"Hideout.png",
      classWeights:
        { 
          Tank: 0.4,
        } 
        },
  { id:"gg-layer-cake",    
      name:"Layer Cake",    
      mode:"Bounty",   
      imageFile:"Layer Cake.png",
      classWeights:
        { 
          Tank: 0.4,
        } 
        },
  { id:"gg-shooting-star",    
      name:"Shooting Star",    
      mode:"Bounty",   
      imageFile:"Shooting Star.png",
      classWeights:
        { 
          Tank: 0.4,
        } 
        },
  { id:"gg-center-stage",    
      name:"Center Stage",    
      mode:"Brawl Ball",   
      imageFile:"Center Stage.png",
      classWeights:
        { 
          Tank: 0.4,
        } 
        },
  { id:"gg-pinball-dreams",    
      name:"Pinball Dreams",    
      mode:"Brawl Ball",   
      imageFile:"Pinball Dreams.png",
      classWeights:
        { 
          Tank: 0.4,
        } 
        },
  { id:"gg-sneaky-fields",    
      name:"Sneaky Fields",    
      mode:"Brawl Ball",   
      imageFile:"Sneaky Fields.png",
      classWeights:
        { 
          Tank: 0.4,
        } 
        },
  { id:"gg-triple-dribble",    
      name:"Triple Dribble",    
      mode:"Brawl Ball",   
      imageFile:"Triple Dribble.png",
      classWeights:
        { 
          Tank: 0.4,
        } 
        },
  { id:"gg-dueling-beatles",    
      name:"Dueling Beatles",    
      mode:"Hot Zone",   
      imageFile:"Dueling Beatles.png",
      classWeights:
        { 
          Tank: 0.4,
        } 
        },
  { id:"gg-open-business",    
      name:"Open Business",    
      mode:"Hot Zone",   
      imageFile:"Open Business.png",
      classWeights:
        { 
          Tank: 0.4,
        } 
        },
  { id:"gg-parallel-plays",    
      name:"Parallel Plays",    
      mode:"Hot Zone",   
      imageFile:"Parallel Plays.png",
      classWeights:
        { 
          Tank: 0.4,
        } 
        },        
  { id:"gg-ring-of-fire",    
      name:"Ring of Fire",    
      mode:"Hot Zone",   
      imageFile:"Ring of Fire.png",
      classWeights:
        { 
          Tank: 0.4,
        } 
        },
  { id:"gg-belle-rock",    
      name:"Belle's Rock",    
      mode:"Knockout",   
      imageFile:"Belle's Rock.png",
      classWeights:
        { 
          Tank: 0.4,
        } 
        },
  { id:"gg-flaring-phoenix",    
      name:"Flaring Phoenix",    
      mode:"Knockout",   
      imageFile:"Flaring Phoenix.png",
      classWeights:
        { 
          Tank: 0.4,
        } 
        },        
  { id:"gg-new-horizons",    
      name:"New Horizons",    
      mode:"Knockout",   
      imageFile:"New Horizons.png",
      classWeights:
        { 
          Tank: 0.4,
        } 
        },
  { id:"gg-out-in-the-open",    
      name:"Out in the Open",    
      mode:"Knockout",   
      imageFile:"Out in the Open.png",
      classWeights:
        { 
          Tank: 0.4,
        } 
        },
      ];

const DRAFT_RANK_PROFILES = [
    { id:"Mythic",      label:"Mythic",      range:"Mythic",      metaWeight:0.8, counterWeight:1.1 },
    { id:"Legendary",   label:"Legendary",   range:"Legendary",   metaWeight:0.9, counterWeight:1.2 },
    { id:"Masters",     label:"Masters",     range:"Masters",     metaWeight:1.0, counterWeight:1.4 },
    { id:"Pro",         label:"Pro",         range:"Pro League",  metaWeight:1.0, counterWeight:1.5 },
];

function draftMapImageUrl(filename) {
    return `../Assets/Ranked-Maps/${filename}`;
}