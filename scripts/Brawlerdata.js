const BRAWLERS = [
    { id: "shelly",       name: "Shelly",       key: "Shelly"       },
    { id: "nita",         name: "Nita",         key: "Nita"         },
    { id: "colt",         name: "Colt",         key: "Colt"         },
    { id: "bull",         name: "Bull",         key: "Bull"         },
    { id: "brock",        name: "Brock",        key: "Brock"        },
    { id: "el-primo",     name: "El Primo",     key: "El Primo"     },
    { id: "barley",       name: "Barley",       key: "Barley"       },
    { id: "poco",         name: "Poco",         key: "Poco"         },
    { id: "rosa",         name: "Rosa",         key: "Rosa"         },
    { id: "jessie",       name: "Jessie",       key: "Jessie"       },
    { id: "dynamike",     name: "Dynamike",     key: "Dynamike"     },
    { id: "tick",         name: "Tick",         key: "Tick"         },
    { id: "8-bit",        name: "8-Bit",        key: "8-Bit"        },
    { id: "rico",         name: "Rico",         key: "Rico"         },
    { id: "darryl",       name: "Darryl",       key: "Darryl"       },
    { id: "penny",        name: "Penny",        key: "Penny"        },
    { id: "carl",         name: "Carl",         key: "Carl"         },
    { id: "jacky",        name: "Jacky",        key: "Jacky"        },
    { id: "gus",          name: "Gus",          key: "Gus"          },
    { id: "bo",           name: "Bo",           key: "Bo"           },
    { id: "emz",          name: "EMZ",          key: "EMZ"          },
    { id: "stu",          name: "Stu",          key: "Stu"          },
    { id: "piper",        name: "Piper",        key: "Piper"        },
    { id: "pam",          name: "Pam",          key: "Pam"          },
    { id: "frank",        name: "Frank",        key: "Frank"        },
    { id: "bibi",         name: "Bibi",         key: "Bibi"         },
    { id: "bea",          name: "Bea",          key: "Bea"          },
    { id: "nani",         name: "Nani",         key: "Nani"         },
    { id: "edgar",        name: "Edgar",        key: "Edgar"        },
    { id: "griff",        name: "Griff",        key: "Griff"        },
    { id: "grom",         name: "Grom",         key: "Grom"         },
    { id: "bonnie",       name: "Bonnie",       key: "Bonnie"       },
    { id: "gale",         name: "Gale",         key: "Gale"         },
    { id: "colette",      name: "Colette",      key: "Colette"      },
    { id: "belle",        name: "Belle",        key: "Belle"        },
    { id: "ash",          name: "Ash",          key: "Ash"          },
    { id: "lola",         name: "Lola",         key: "Lola"         },
    { id: "sam",          name: "Sam",          key: "Sam"          },
    { id: "mandy",        name: "Mandy",        key: "Mandy"        },
    { id: "maisie",       name: "Maisie",       key: "Maisie"       },
    { id: "hank",         name: "Hank",         key: "Hank"         },
    { id: "pearl",        name: "Pearl",        key: "Pearl"        },
    { id: "larry-lawrie", name: "Larry & Lawrie", key: "Larry & Lawrie" },
    { id: "angelo",       name: "Angelo",       key: "Angelo"       },
    { id: "berry",        name: "Berry",        key: "Berry"        },
    { id: "mortis",       name: "Mortis",       key: "Mortis"       },
    { id: "tara",         name: "Tara",         key: "Tara"         },
    { id: "gene",         name: "Gene",         key: "Gene"         },
    { id: "max",          name: "Max",          key: "Max"          },
    { id: "mr. p",        name: "Mr. P",       key: "Mr. P"         },
    { id: "sprout",       name: "Sprout",       key: "Sprout"       },
    { id: "byron",        name: "Byron",        key: "Byron"        },
    { id: "squeak",       name: "Squeak",       key: "Squeak"       },
    { id: "lou",          name: "Lou",          key: "Lou"          },
    { id: "ruffs",        name: "Ruffs",        key: "Ruffs"        },
    { id: "buzz",         name: "Buzz",         key: "Buzz"         },
    { id: "fang",         name: "Fang",         key: "Fang"         },
    { id: "eve",          name: "Eve",          key: "Eve"          },
    { id: "janet",        name: "Janet",        key: "Janet"        },
    { id: "otis",         name: "Otis",         key: "Otis"         },
    { id: "buster",       name: "Buster",       key: "Buster"       },
    { id: "gray",         name: "Gray",         key: "Gray"         },
    { id: "r-t",          name: "R-T",          key: "R-T"          },
    { id: "willow",       name: "Willow",       key: "Willow"       },
    { id: "doug",         name: "Doug",         key: "Doug"         },
    { id: "chuck",        name: "Chuck",        key: "Chuck"        },
    { id: "charlie",      name: "Charlie",      key: "Charlie"      },
    { id: "mico",         name: "Mico",         key: "Mico"         },
    { id: "melodie",      name: "Melodie",      key: "Melodie"      },
    { id: "lily",         name: "Lily",         key: "Lily"         },
    { id: "clancy",       name: "Clancy",       key: "Clancy"       },
    { id: "moe",          name: "Moe",          key: "Moe"          },
    { id: "juju",         name: "Juju",         key: "Juju"         },
    { id: "spike",        name: "Spike",        key: "Spike"        },
    { id: "crow",         name: "Crow",         key: "Crow"         },
    { id: "leon",         name: "Leon",         key: "Leon"         },
    { id: "sandy",        name: "Sandy",        key: "Sandy"        },
    { id: "amber",        name: "Amber",        key: "Amber"        },
    { id: "meg",          name: "Meg",          key: "Meg"          },
    { id: "surge",        name: "Surge",        key: "Surge"        },
    { id: "chester",      name: "Chester",      key: "Chester"      },
    { id: "cordelius",    name: "Cordelius",    key: "Cordelius"    },
    { id: "kit",          name: "Kit",          key: "Kit"          },
    { id: "draco",        name: "Draco",        key: "Draco"        },
    { id: "kenji",        name: "Kenji",        key: "Kenji"        },
    { id: "gigi",         name: "Gigi",         key: "Gigi"         },
    { id: "pierce",       name: "Pierce",       key: "Pierce"       },
    { id: "glowbert",     name: "Glowbert",     key: "Glowbert"     },
    { id: "ziggy",        name: "Ziggy",        key: "Ziggy"        },
    { id: "mina",         name: "Mina",         key: "Mina"         },
    { id: "jea-yong",     name: "Jea-Yong",     key: "Jea-Yong"     },
    { id: "lumi",         name: "Lumi",         key: "Lumi"         },
    { id: "trunk",        name: "Trunk",        key: "Trunk"        },
    { id: "alli",         name: "Alli",         key: "Alli"         },
    { id: "kaze",         name: "Kaze",         key: "Kaze"         },
    { id: "finx",         name: "Finx",         key: "Finx"         },
    { id: "meeple",       name: "Meeple",       key: "Meeple"       },
    { id: "ollie",        name: "Ollie",        key: "Ollie"        },
    { id: "shade",        name: "Shade",        key: "Shade"        },


];

const PREMADE_TIERS = {

    // ── TROPHIES───────────────────────────────────────────────────────────────
    Trophies: {
        S: ["frank", "emz", "bibi"],
        A: ["rico", "spike", "carl", "mico", "pierce", "cordelius", "colt", "mortis", "bo", "brock"],
        B: ["crow", "fang", "bull", "kenji", "griff", "poco", "byron", "jessie", "bea", "surge", "piper", "gus", "mandy", "edgar", "lily", "tick", 
            "dynamike", "otis", "tara", "stu", "grom", "angelo", "nani", "penny", "gray", "gale", "squeak", "nita", "mina", "glowbert", "shade", "leon", 
            "melodie", "el-primo", "belle", "darryl", "meeple", "chester"], 
        C: ["doug", "kaze", "gene", "jacky", "barley", "shelly", "chuck", "amber", "buzz", "maisie", "mr. p", "juju",
            "sandy", "kit", "r-t", "buster", "berry", "willow", "clancy", "hank", "max", "colette", "larry-lawrie", "ruffs", "gigi", "eve", "alli"],
        D: ["finx", "charlie", "trunk", "moe", "lou", "meg", "sprout", "ash", "ollie", "janet", "sam", "draco", "8-bit", 
            "pearl", "bonnie", "pam", "rosa", "ziggy", "jea-yong", "lumi"],
        F: ["lola"],
    },

    // ── BRAWL ARENA ───────────────────────────────────────────────────────────────
    "Brawl Arena": {
        S: ["glowbert", "emz", "colt", "gigi", "spike", "pierce", "rico"],
        A: ["piper", "mortis", "penny", "brock", "tick", "jessie", "surge", "byron", "edgar", "chester", 
            "lily", "griff", "poco", "amber", "mandy"],
        B: ["kit", "cordelius", "bibi", "dynamike", "nita", "kenji", "frank", "shelly", "8-bit", "shade", 
            "leon", "berry", "tara", "barley", "fang", "bull", "clancy", "crow", "buzz", "bo", "nani",
            "chuck", "carl", "colette", "grom"],
        C: ["el primo", "angelo", "alli", "squeak", "darryl", "lumi", "ash", "stu" ,"pam", "bea", "belle", 
            "mr. p", "doug", "gene", "trunk", "mina", "jacky", "maisie", "r-t", "meg", "rosa", "melodie", 
            "larry-lawrie", "gale", "ruffs", "janet", "draco", "mico", "otis", "kaze"],
        D: ["pearl", "max", "sandy", "lola", "moe", "lou", "hank", "buster", "gray", "willow", "sam", "finx", 
            "bonnie", "meeple", "gus"],
        F: ["ollie", "ziggy", "juju", "charlie", "jae-yong", "eve"],
    },

    // ── DIAMOND ───────────────────────────────────────────────────────────────
    Diamond: {
        S: ["bibi", "chuck", "nita", "bo", "grom", "carl", "penny", "jessie"],
        A: ["rico", "brock", "doug", "bull", "tara", "griff", "emz", "tick", "mico", "cordelius", "frank", 
            "mr. p", "poco", "lily", "byron", "mortis", "spike", "kenji", "edgar"],
        B: ["crow", "fang", "leon", "mandy", "colt", "piper", "surge", "gus", "dynamike", "jacky", "pierce", 
            "barley", "nani", "squeak", "gale", "juju", "melodie", "gray", "belle", "darryl", "chester", "bea", 
            "angelo", "shade", "berry", "el primo", "colette", "buzz", "otis", "sandy", "kit"],
        C: ["eve", "stu", "shelly", "meeple", "gene", "larry-lawrie", "amber", "maisie", "8-bit", "glowbert", "kaze",  
            "r-t", "hank", "sprout", "buster", "willow"],
        D: ["lou", "clancy", "mina", "meg", "janet", "ash", "bonnie", "trunk", "pearl", "finx", "rosa", "alli", 
            "draco", "ruffs", "max", "gigi", "ziggy", "charlie", "ollie", "pam", "moe", "sam", "lola"],
        F: ["jea-yong", "lumi"],
    },

    // ── MYTHIC ────────────────────────────────────────────────────────────────
    Mythic: {
        S: ["emz"],
        A: ["frank", "bibi", "mico", "carl", "spike", "bo", "rico", "grom", "jessie", "mr. p"],
        B: ["edgar", "griff", "cordelius", "tara", "mortis", "crow", "brock", "colt", "penny", "tick", "surge",
            "nita", "angelo", "nani", "otis", "gus", "lily", "kenji", "bull", "juju", "gray", "chuck", 
            "gale", "piper", "byron", "mandy", "poco", "pierce", "squeak", "leon", "meeple", "dynamike", "melodie",
            "doug", "shade", "fang", "belle", "eve", "gene", "darryl", "barley", "r-t", "bea", "amber"],
        C: ["buster", "berry", "chester", "mina", "kaze", "sandy", "stu", "colette", "jacky", "larry-lawrie", "shelly", 
            "kit", "hank", "maisie", "ruffs", "buzz", "el primo"],
        D: ["willow", "sprout", "finx", "janet", "alli", "charlie", "pearl", "8-bit", "lou", "clancy", "ash", "bonnie", 
            "meg", "gigi", "trunk", "ollie", "draco", "moe", "max", "pam", "rosa", "jea-yong", "sam", "ziggy"],
        F: ["lola", "lumi"],
    },

    // ── LEGENDARY ─────────────────────────────────────────────────────────────
    Legendary: {
        S: ["frank", "emz"],
        A: ["spike", "mortis", "rico", "carl", "colt"],
        B: ["angelo", "mico", "otis", "cordelius", "lily", "crow", "gus", "kenji", "mina", "brock", "pierce", 
            "Kkaze", "nani", "gene", "gray", "byron", "melodie", "amber", "bo", "meeple", "piper", "tara", 
            "belle", "squeak", "shade", "juju", "penny", "mandy", "buster", "r-t", "bea"],
        C: ["bibi", "griff", "mr. p", "finx", "surge", "grom", "alli", "ruffs", "bull", "darryl", "shelly", 
            "berry", "barley", "eve", "stu", "poco", "chuck", "hank", "tick", "charlie", "janet", "dynamike", 
            "gale", "larry-lawrie", "jessie", "sprout"],
        D: ["edgar", "leon", "willow", "fang", "gigi", "chester", "sandy", "moe", "doug", "ollie", "kit", 
            "ash", "nita", "trunk", "max", "jae-yong", "lou", "colette", "maisie", "buzz", "el primo", "meg", 
            "pam", "jacky", "pearl", "bonnie", "draco", "8-bit"],
        F: ["clancy", "lumi", "ziggy", "sam", "rosa", "lola"],
    },

    // ── MASTERS ───────────────────────────────────────────────────────────────
    Masters: {
        S: ["emz", "spike", "frank", "mina", "pierce", "rico", "crow"],
        A: ["poco", "colt", "mortis", "ruffs", "byron", "kaze", "angelo", "otis", "lily", "shade", "amber", 
            "shelly", "juju", "meeple", "gene", "gray", "gus", "finx", "kenji", "alli", "belle", "cordelius", "nani"],
        B: ["hank", "charlie", "moe", "squeak", "penny", "jea-yong", "max", "sandy", "carl", "tara", "r-t", "willow", 
            "ollie", "melodie", "janet", "larry-lawrie", "piper", "stu", "brock", "pam", "ash", "tick", "berry", "barley"],
        C: ["lumi", "draco", "trunk", "chester", "buster", "bea", "gigi", "kit", "bull", "meg", "gale", "griff", "nita", 
            "lola", "eve", "mandy", "sprout", "8-bit", "lou", "bibi", "doug", "pearl", "maisie"],
        D: ["mico", "dynamike", "el primo", "Darryl", "bo", "buzz", "ziggy", "fang", "leon", "surge", "edgar", "mr. p", 
            "clancy", "grom", "sam", "bonnie", "colette", "chuck"],
        F: ["jacky", "jessie", "rosa"],
    },

    // ── PRO ───────────────────────────────────────────────────────────────────
    Pro: {
        S: ["spike", "frank", "emz", "rico", "mina", "mortis"],
        A: ["poco", "pierce", "shade", "otis", "kaze", "crow", "ruffs", "shelly", "amber"],
        B: ["gray", "colt", "kenji", "charlie", "cordelius", "max", "gus", "meeple", "angelo", "gene", 
            "byron", "finx", "bea", "stu", "brock", "lily", "alli", "juju"],
        C: ["ollie", "melodie", "belle", "moe", "pam", "trunk", "tara", "buster", "r-t", "sandy", "kit", 
            "chuck", "willow", "mico", "gigi", "lumi", "nani", "squeak", "penny", "chester", "carl", "hank", 
            "draco", "jae-yong", "lola", "eve", "ash", "tick", "meg", "darryl" ],
        D: ["larrie-lawrie", "barley", "janet", "maisie", "bull", "pearl", "clancy", "berry", "lou", "piper", "leon", 
            "8-bit", "sprout", "buzz", "doug", "fang", "bibi", "jacky", "sam", "griff", "ziggy", "gale", 
            "edgar", "nita", "jessie", "el primo", "mr. p", "colette", "mandy", "grom"],
        F: ["dynamike", "surge", "bo", "bonnie", "rosa"],
    },
};

const RANKS = [
    { key: "Trophies",    label: "Trophies",    logoFile: "Trophy_Logo.png",      color: "#f5a723" },
    { key: "Brawl Arena", label: "Brawl Arena", logoFile: "Brawl_Arena_Logo.png", color: "#5af3ff" },
    { key: "Diamond",     label: "Diamond",     logoFile: "Diamond_Logo.png",     color: "#08c4f9" },
    { key: "Mythic",      label: "Mythic",      logoFile: "Mythic_Logo.png",      color: "#d219ee" },
    { key: "Legendary",   label: "Legendary",   logoFile: "Legendary_Logo.png",   color: "#f80000" },
    { key: "Masters",     label: "Masters",     logoFile: "Masters_Logo.png",     color: "#ff6b00" },
    { key: "Pro",         label: "Pro",         logoFile: "Pro_Logo.png",         color: "#00db39" },
];

/**
 * @param {string} key 
 * @returns {string}
 */
function portraitUrl(key) {
    return `../assets/Portraits/${key}_Portrait.jpg`;
}

/**
 * @param {string} logoFile
 * @returns {string}
 */
function rankLogoUrl(logoFile) {
    return `../assets/Ranked-Ranks/${logoFile}`;
}