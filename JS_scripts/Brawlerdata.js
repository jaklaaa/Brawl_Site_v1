const BRAWLERS = [
    { id: "shelly", name: "Shelly", key: "Shelly", rarity: "starter" },
    { id: "nita", name: "Nita", key: "Nita", rarity: "rare" },
    { id: "colt", name: "Colt", key: "Colt", rarity: "rare" },
    { id: "bull", name: "Bull", key: "Bull", rarity: "rare" },
    { id: "brock", name: "Brock", key: "Brock", rarity: "rare" },
    { id: "el primo", name: "El Primo", key: "El Primo", rarity: "rare" },
    { id: "barley", name: "Barley", key: "Barley", rarity: "rare" },
    { id: "poco", name: "Poco", key: "Poco", rarity: "rare" },
    { id: "jessie", name: "Jessie", key: "Jessie", rarity: "super rare" },
    { id: "dynamike", name: "Dynamike", key: "Dynamike", rarity: "super rare" },
    { id: "rico", name: "Rico", key: "Rico", rarity: "super rare" },
    { id: "bo", name: "Bo", key: "Bo", rarity: "epic" },
    { id: "mortis", name: "Mortis", key: "Mortis", rarity: "mythic" },
    { id: "spike", name: "Spike", key: "Spike", rarity: "legendary" },
    { id: "crow", name: "Crow", key: "Crow", rarity: "legendary" },
    { id: "piper", name: "Piper", key: "Piper", rarity: "epic" },
    { id: "pam", name: "Pam", key: "Pam", rarity: "epic" },
    { id: "tara", name: "Tara", key: "Tara", rarity: "mythic" },
    { id: "darryl", name: "Darryl", key: "Darryl", rarity: "super rare" },
    { id: "penny", name: "Penny", key: "Penny", rarity: "super rare" },
    { id: "frank", name: "Frank", key: "Frank", rarity: "epic" },
    { id: "leon", name: "Leon", key: "Leon", rarity: "legendary" },
    { id: "gene", name: "Gene", key: "Gene", rarity: "mythic" },
    { id: "carl", name: "Carl", key: "Carl", rarity: "super rare" },
    { id: "rosa", name: "Rosa", key: "Rosa", rarity: "rare" },
    { id: "bibi", name: "Bibi", key: "Bibi", rarity: "epic" },
    { id: "tick", name: "Tick", key: "Tick", rarity: "super rare" },
    { id: "8-bit", name: "8-Bit", key: "8-Bit", rarity: "super rare" },
    { id: "sandy", name: "Sandy", key: "Sandy", rarity: "legendary" },
    { id: "emz", name: "Emz", key: "Emz", rarity: "epic" },
    { id: "bea", name: "Bea", key: "Bea", rarity: "epic" },
    { id: "max", name: "Max", key: "Max", rarity: "mythic" },
    { id: "mr. p", name: "Mr. P", key: "Mr. P", rarity: "mythic" },
    { id: "jacky", name: "Jacky", key: "Jacky", rarity: "super rare" },
    { id: "sprout", name: "Sprout", key: "Sprout", rarity: "mythic" },
    { id: "gale", name: "Gale", key: "Gale", rarity: "epic" },
    { id: "nani", name: "Nani", key: "Nani", rarity: "epic" },
    { id: "surge", name: "Surge", key: "Surge", rarity: "legendary" },
    { id: "colette", name: "Colette", key: "Colette", rarity: "epic" },
    { id: "amber", name: "Amber", key: "Amber", rarity: "legendary" },
    { id: "lou", name: "Lou", key: "Lou", rarity: "mythic" },
    { id: "byron", name: "Byron", key: "Byron", rarity: "mythic" },
    { id: "edgar", name: "Edgar", key: "Edgar", rarity: "epic" },
    { id: "ruffs", name: "Ruffs", key: "Ruffs", rarity: "mythic" },
    { id: "stu", name: "Stu", key: "Stu", rarity: "epic" },
    { id: "belle", name: "Belle", key: "Belle", rarity: "epic" },
    { id: "squeak", name: "Squeak", key: "Squeak", rarity: "mythic" },
    { id: "buzz", name: "Buzz", key: "Buzz", rarity: "mythic" },
    { id: "griff", name: "Griff", key: "Griff", rarity: "epic" },
    { id: "ash", name: "Ash", key: "Ash", rarity: "epic" },
    { id: "meg", name: "Meg", key: "Meg", rarity: "legendary" },
    { id: "lola", name: "Lola", key: "Lola", rarity: "epic" },
    { id: "grom", name: "Grom", key: "Grom", rarity: "epic" },
    { id: "fang", name: "Fang", key: "Fang", rarity: "mythic" },
    { id: "eve", name: "Eve", key: "Eve", rarity: "mythic" },
    { id: "janet", name: "Janet", key: "Janet", rarity: "mythic" },
    { id: "bonnie", name: "Bonnie", key: "Bonnie", rarity: "epic" },
    { id: "otis", name: "Otis", key: "Otis", rarity: "mythic" },
    { id: "sam", name: "Sam", key: "Sam", rarity: "epic" },
    { id: "gus", name: "Gus", key: "Gus", rarity: "super rare" },
    { id: "buster", name: "Buster", key: "Buster", rarity: "mythic" },
    { id: "chester", name: "Chester", key: "Chester", rarity: "legendary" },
    { id: "gray", name: "Gray", key: "Gray", rarity: "mythic" },
    { id: "mandy", name: "Mandy", key: "Mandy", rarity: "epic" },
    { id: "r-t", name: "R-T", key: "R-T", rarity: "mythic" },
    { id: "willow", name: "Willow", key: "Willow", rarity: "mythic" },
    { id: "maisie", name: "Maisie", key: "Maisie", rarity: "epic" },
    { id: "hank", name: "Hank", key: "Hank", rarity: "epic" },
    { id: "cordelius", name: "Cordelius", key: "Cordelius", rarity: "legendary" },
    { id: "doug", name: "Doug", key: "Doug", rarity: "mythic" },
    { id: "pearl", name: "Pearl", key: "Pearl", rarity: "epic" },
    { id: "chuck", name: "Chuck", key: "Chuck", rarity: "mythic" },
    { id: "charlie", name: "Charlie", key: "Charlie", rarity: "mythic" },
    { id: "mico", name: "Mico", key: "Mico", rarity: "mythic" },
    { id: "kit", name: "Kit", key: "Kit", rarity: "legendary" },
    { id: "larry-lawrie", name: "Larry & Lawrie", key: "Larry & Lawrie", rarity: "epic" },
    { id: "angelo", name: "Angelo", key: "Angelo", rarity: "epic" },
    { id: "melodie", name: "Melodie", key: "Melodie", rarity: "mythic" },
    { id: "lily", name: "Lily", key: "Lily", rarity: "mythic" },
    { id: "draco", name: "Draco", key: "Draco", rarity: "legendary" },
    { id: "berry", name: "Berry", key: "Berry", rarity: "epic" },
    { id: "clancy", name: "Clancy", key: "Clancy", rarity: "mythic" },
    { id: "moe", name: "Moe", key: "Moe", rarity: "mythic" },
    { id: "kenji", name: "Kenji", key: "Kenji", rarity: "legendary" },
    { id: "juju", name: "Juju", key: "Juju", rarity: "mythic" },
    { id: "shade", name: "Shade", key: "Shade", rarity: "epic" },
    { id: "meeple", name: "Meeple", key: "Meeple", rarity: "epic" },
    { id: "ollie", name: "Ollie", key: "Ollie", rarity: "mythic" },
    { id: "finx", name: "Finx", key: "Finx", rarity: "mythic" },
    { id: "lumi", name: "Lumi", key: "Lumi", rarity: "mythic" },
    { id: "kaze", name: "Kaze", key: "Kaze", rarity: "ultra legendary" },
    { id: "jae-yong", name: "Jae-yong", key: "Jae-yong", rarity: "mythic" },
    { id: "alli", name: "Alli", key: "Alli", rarity: "mythic" },
    { id: "trunk", name: "Trunk", key: "Trunk", rarity: "epic" },
    { id: "mina", name: "Mina", key: "Mina", rarity: "mythic" },
    { id: "ziggy", name: "Ziggy", key: "Ziggy", rarity: "mythic" },
    { id: "gigi", name: "Gigi", key: "Gigi", rarity: "mythic" },
    { id: "pierce", name: "Pierce", key: "Pierce", rarity: "legendary" },
    { id: "glowy", name: "Glowy", key: "Glowy", rarity: "mythic" },
    { id: "sirius", name: "Sirius", key: "Sirius", rarity: "ultra legendary" },
];


const PREMADE_TIERS = {

    // ── TROPHIES───────────────────────────────────────────────────────────────
    
    Trophies: {
        S: ["sirius", "pierce", "glowy", "bibi"], 
        A: ["emz", "spike", "crow", "rico", "trunk", "gigi", "mina", "kaze", "bo", "doug", "ziggy", "mortis", "lily"],
        B: ["otis", "colt", "cordelius", "shade", "r-t", "kenji", "squeak", "alli", "bull", "fang", "penny", "frank", 
            "amber", " carl", "edgar", "meeple", "chester", "leon", "juju", "finx", "griff", "rosa", "grom", "nita", " poco", "dynamike"], 
        C: ["angelo", "ruffs", "jessie", "mico", "melodie", "tick", "tara", "charlie", "eve", "willow", "brock", "sandy", "byron", 
            "buster", "mr. p", "ash", "chuck", "mandy", "bea", "belle", "draco", "janet", "berry", "8-bit", "larry-lawrie", "ollie", 
            "gray", "barley", "moe", "nani", "kit", "pam", "lou", "sam", "gus", "gene", "piper", "meg", "bonnie", "jae-yong", "clancy", "lumi"], 
        D: ["shelly", "hank", "buzz", "maisie", "stu", "surge", "sprout", "pearl", "lola", "colette", "jacky", "darryl", "gale", "el primo"], 
        F: ["max"] 
    },

    // ── BRAWL ARENA ───────────────────────────────────────────────────────────────
    "Brawl Arena": {
        S: ["bibi", "glowy", "emz", "colt", "pierce"],
        A: ["griff", "8-bit", "spike", "rico", "jessie", "penny", "amber", "clancy", "crow", "chester", "lumi", "bo", "nita"],
        B: ["el primo", "gigi", "berry", "edgar", "tara", "mandy", "barley", "carl", "brock", "mina", "kenji", "bull", "leon",
            "squeak", "trunk", "mortis", "surge", "cordelius", "doug", "frank", "larry-lawrie", "shade", "kaze", "poco", "r-t" ,"colette"],
        C: ["meg", "dynamike", "otis", "jacky", "ruffs", "moe", "byron", "fang", "piper", "tick", "gale", "draco", "bea",
            "melodie", "charlie", "buzz", "mico", "sirius", "kit"],
        D: ["mr. p", "grom", "pam", "darryl", "chuck", "nani", "ziggy", "lily", "alli",
            "ash", "meeple", "buster", "stu", "finx", "shelly", "lola", "hank", "sandy", "pearl", "rosa", "maisie", "janet", "willow"],
        F: ["jae-yong", "juju", "max", "ollie", "lou", "bonnie", "sprout", "gus", "gray", "eve", "sam", "belle",  "gene", "angelo"]        
    },

    // ── DIAMOND ───────────────────────────────────────────────────────────────
    Diamond: {
        S: ["bibi", "bo", "emz", "grom", "frank"],
        A: ["mico", "carl", "brock", "mortis", "jessie", "griff", "tick", "rico"],
        B: ["crow", "spike", "bull", "penny", "doug", "tara", "cordelius"," lily", "byron", "kenji", "nita", "pierce", "leon", 
            "chuck", "poco", "surge", "colt", "gus", "fang", "mandy"],
        C: ["mr. p", "nani", "piper", "dynamike", "edgar", "shade", "squeak", "gray", "otis", "angelo", "bea", "belle", "juju", "kit", 
            "jacky", "meeple", "chester", "stu", "sandy", "darryl", "melodie", "barley", "el primo", "shelly", "gene", "berry", "gale", 
            "buzz", "eve", "glowy", "kaze", "mina", "colette"], 
        D: ["r-t", "buster", "hank", "larry-lawrie", "willow", "maisie", "alli", "8-bit", "sprout", "clancy", "trunk", "lou",
            "finx", "janet", "ruffs", "ash", "pearl", "rosa", "meg", "max", "draco", "bonnie", "charlie", "gigi", "ollie"],
        F: ["pam", "moe", "ziggy", "sam", "lola", "jae-yong", "lumi"],    
        },

    // ── MYTHIC ────────────────────────────────────────────────────────────────
    Mythic: {
        S: ["bibi", "emz", "frank", "spike", "mortis", "bo", "crow"],
        A: ["carl", "rico", "brock", "otis", "mico", "pierce", "angelo", "gus", "cordelius", "colt", "nani", "lily", "mina"],
        B: ["kenji", "leon", "gray", "griff", "tara", "shade", "byron", "piper", "squeak", "bull", "meeple", "mandy", "grom", "tick", 
            "gene", "mr. p", "penny", "belle", "juju", "edgar", "surge", "shelly", "bea", "fang", "r-t", "melodie", "jessie", "kit", 
            "poco", "amber", "kaze"],
        C: ["buster", "chester", "dynamike", "stu", "eve", "nita", "doug", "alli", "ruffs", "darryl", "sandy", "glowy", "barley", "chuck", 
            "charlie", "hank", "willow", "finx", "berry", "janet", "gale", "colette", "jacky", "sprout", "larry-lawrie", "buzz", "trunk", 
            "lou"],
        D: ["maisie", "gigi", "el primo", "pearl", "8-bit", "moe", "ash", "bonnie", "max", "ollie"],
        F: ["pam", "meg", "draco", "clancy", "jae-yong", "rosa", "ziggy", "sam", "lola", "lumi"]        
    },

    // ── LEGENDARY ─────────────────────────────────────────────────────────────
    Legendary: {
        S: ["bibi", "spike", "emz", "crow", "leon"],
        A: ["shelly", "frank", "mortis", "angelo", "colt", "brock", "rico", "bo", "bull", "otis", "mina", "kenji", "pierce", "gray", "nita", "chester"],
        B: ["gus", "lily", "carl", "byron", "nani", "gene", "meeple", "kaze", "shade", "cordelius", "belle", "piper", "squeak", "ruffs", "glowy", 
            "charlie", "penny", "alli", "amber", "tara", "bea", "juju", "r-t", "poco"],
        C: ["mico", "melodie", "mandy", "kit", "buster", "stu", "finx", "trunk", "moe", "janet", "darryl", "griff", "hank", "fang", "willow", "barley", 
            "sandy", "sprout", "eve", "max", "gigi", "berry", "tick", "mr. p", "lou"],
        D: ["chuck", "dynamike", "grom", "doug", "surge", "bonnie", "8-bit", "ash", "ollie", "buzz", "larry-lawrie", "pam", "colette", "edgar", "draco", 
            "pearl", "jacky", "maisie", "jessie", "jae-yong", "ziggy", "el primo"],
        F: ["meg", "gale", "lumi", "lola", "clancy", "rosa", "sam"],        
    },

    // ── MASTERS ───────────────────────────────────────────────────────────────
    Masters: {
        S: ["emz", "spike", "frank", "mina", "pierce", "rico", "crow"],
        A: ["poco", "colt", "mortis", "ruffs", "byron", "kaze", "angelo", "otis", "lily", "shade", "amber", 
            "shelly", "juju", "meeple", "gene", "gray", "gus", "finx", "kenji", "alli", "belle", "cordelius", "nani"],
        B: ["hank", "charlie", "moe", "squeak", "penny", "jae-yong", "max", "sandy", "carl", "tara", "r-t", "willow", 
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