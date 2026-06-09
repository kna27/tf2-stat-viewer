// Dependencies
const { createClient } = require("redis");

// Constants
const settings = { method: "Get" };
const MAPPREFIXES = [
    "arena_",
    "cp_",
    "ctf_",
    "htf_",
    "koth_",
    "mvm_",
    "pass_",
    "pd_",
    "pl_",
    "plr_",
    "rd_",
    "sd_",
    "tc_",
    "tow_",
    "tr_",
    "vsh_",
    "zi_"
];

//--- REDIS / PERSISTENCE LOGIC ---//
let redisClient = null;
if (process.env.REDIS_URL) {
    redisClient = createClient({ url: process.env.REDIS_URL });
    redisClient.on("error", (err) => console.error("Redis Client Error", err));
    redisClient.connect().catch(console.error);
}

async function incrementViews() {
    if (!redisClient) {
        console.error("Redis client not initialized");
        return;
    }

    try {
        const views = await redisClient.incr("views");
        console.log(`Total views: ${views}`);
    } catch (err) {
        console.error("Redis error during increment:", err);
    }
}

//--- GETTING JSON STATS ---//

// Used to check if JSON is not an HTML response and parses it
async function safeParseJSON(response, res) {
    const body = await response.text();
    try {
        return JSON.parse(body);
    } catch (err) {
        console.error("Error Parsing JSON:", err);
        console.error("Response body:", body);
        if (!res.headersSent) {
            res.render("private_profile");
        }
        return null;
    }
}

// Fetches player stats JSON from the Steam API
async function fetchJson(id, req, resp, pfp, name) {
    var url = `http://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v2/?key=${process.env.STEAM_API_KEY}&appid=440&steamid=${id}&count=1&format=json`;
    try {
        const res = await fetch(url, settings);

        if (!res.ok) {
            // A non-200 response often means the profile is private or has no TF2 stats
            if (!resp.headersSent) {
                return resp.render("private_profile");
            }
            return;
        }

        const json = await safeParseJSON(res, resp);
        if (json) {
            const statsDict = jsonToDict(json, resp);
            if (!statsDict) {
                if (!resp.headersSent) {
                    return resp.render("private_profile");
                }
                return;
            }
            let allStats = formatStats(statsDict);
            renderStats(resp, allStats, pfp, name);
        }
    } catch (err) {
        console.error("Error fetching JSON:", err);
        if (!resp.headersSent) {
            resp.render("profile_not_found");
        }
    }
}

// Converts JSON from fetchJson() into a javascript dictionary
function jsonToDict(jsonStats, res) {
    if (!jsonStats || !jsonStats.playerstats || !jsonStats.playerstats.stats) {
        return null;
    }

    var stats = jsonStats.playerstats.stats;
    let dictStats = {};
    for (let i = 0; i < stats.length; i++) {
        dictStats[stats[i]["name"]] = stats[i]["value"];
    }
    return dictStats;
}

function formatStats(statsDict) {
    for (var key in statsDict) {
        // Class playtime stats
        if (
            key.endsWith(".accum.iPlayTime") &&
            !MAPPREFIXES.some((substring) => key.includes(substring)) &&
            !key.endsWith(".mvm.accum.iPlayTime")
        ) {
            // Convert to hours
            statsDict[key] = (statsDict[key] / 3600).toFixed(2);
        }
    }

    return statsDict;
}

// Render and send the stats to the ejs page
function renderStats(res, stats, pfp, name) {
    if (!res.headersSent) {
        res.render("index", {
            playerStats: stats,
            profilePicture: pfp,
            nickName: name,
        });
    }
}

module.exports = { fetchJson, incrementViews };
