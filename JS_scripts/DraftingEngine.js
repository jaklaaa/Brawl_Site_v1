(function () {
    "use strict";

    function getRankProfile(rankId) {
        return DRAFT_RANK_PROFILES.find(r => r.id === rankId) || DRAFT_RANK_PROFILES[0];
    }

    function counterBonus(winnerId, loserId) {
        const map = COUNTERS[winnerId.toLowerCase()];
        return map ? (map[loserId.toLowerCase()] || 0) : 0;
    }

    function counterOffenseScore(b, enemies) {
        return enemies.reduce((sum, e) => sum + counterBonus(b.id, e.id), 0);
    }

    function counterVulnScore(b, enemies) {
        return enemies.reduce((sum, e) => sum + counterBonus(e.id, b.id), 0);
    }

    function mapSynergyScore(b, map) {
        if (!map) return 0;
        const weights = map.classWeights || {};
        const roles   = getRoles(b.id);
        const avg     = roles.reduce((s, r) => s + (weights[r] || 1.0), 0) / roles.length;
        return (avg - 1.0) * 10;
    }

    function teamSynergyScore(b, allies) {
        const allyRoles = new Set(allies.flatMap(a => getRoles(a.id)));
        const myRoles   = getRoles(b.id);
        let bonus = 0;
        if (!allyRoles.has("support")     && myRoles.includes("support"))     bonus += 1.5;
        if (!allyRoles.has("controller")  && myRoles.includes("controller"))  bonus += 1.0;
        if (!allyRoles.has("assassin")    && myRoles.includes("assassin"))    bonus += 0.5;
        if (!allyRoles.has("heavyweight") && myRoles.includes("heavyweight")) bonus += 0.5;
        if (!allyRoles.has("thrower")     && myRoles.includes("thrower"))     bonus += 0.5;
        return bonus;
    }

    /**
     * Score every available brawler and return sorted results.
     * @param {object} opts
     *   allyPicks   {array}  brawler objects
     *   enemyPicks  {array}  brawler objects
     *   bannedIds   {Set}    string ids
     *   map         {object|null}
     *   rankId      {string}
     */
    function scoreBrawlers({ allyPicks, enemyPicks, bannedIds, map, rankId }) {
        const profile   = getRankProfile(rankId);
        const pickedIds = new Set([
            ...allyPicks.map(b => b.id),
            ...enemyPicks.map(b => b.id),
        ]);

        const results = [];
        for (const b of BRAWLERS) {
            if (pickedIds.has(b.id) || bannedIds.has(b.id)) continue;

            const meta    = metaForRank(b.id, rankId);
            const offense = counterOffenseScore(b, enemyPicks);
            const vuln    = counterVulnScore(b, enemyPicks);
            const mapSyn  = mapSynergyScore(b, map);
            const teamSyn = teamSynergyScore(b, allyPicks);

            const score =
                meta    * profile.metaWeight
              + offense * profile.counterWeight
              - vuln    * profile.counterWeight
              + mapSyn
              + teamSyn;

            results.push({
                brawler:    b,
                score:      Math.max(0, score),
                tierLabel:  tierLabelForRank(b.id, rankId),
                breakdown: {
                    meta:    +(meta    * profile.metaWeight).toFixed(1),
                    offense: +(offense * profile.counterWeight).toFixed(1),
                    vuln:    +(-vuln   * profile.counterWeight).toFixed(1),
                    map:     +mapSyn.toFixed(1),
                    team:    +teamSyn.toFixed(1),
                },
            });
        }

        results.sort((a, b) => b.score - a.score);
        return results;
    }

    window.DraftEngine = { scoreBrawlers, getRankProfile };
})();