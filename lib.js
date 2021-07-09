// Dependencies
const fetch = require('node-fetch');
const fs = require("fs");

// Constants
const settings = { method: "Get" };
const MAPPREFIXES = ["arena_", "cp_", "ctf_", "koth_", "mvm_", "pass_", "pd_", "pl_", "plr_", "rd_", "sd_", "tc_", "tr_"];


//--- GETTING JSON STATS ---//

// Used to check if JSON is not an HTML response and parses it
async function safeParseJSON(response, res) {
    const body = await response.text();
    try {
        return JSON.parse(body);
    } catch (err) {
        console.error("Error Parsing JSON:", err);
        console.error("Response body:", body);
        res.render('profile_not_found');
    }
}

// Fetches player stats JSON from the Steam API 
function fetchJson(id, req, resp) {
    var url = `http://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v2/?key=${process.env.API_KEY}&appid=440&steamid=${id}&count=1&format=json`;
    try {
        fetch(url, settings).catch((err) => {
            resp.render('profile_not_found');
            console.log("Error fetching JSON: " + err)
            return;
        })
            .then(res => safeParseJSON(res, resp))
            .then((json) => {
                if (json != null) {
                    let allStats = formatStats(jsonToDict(json, resp));
                    renderStats(resp, allStats);
                }
                else {
                    resp.render('profile_not_found');
                }
            })
    } catch (err) {
        console.log("Error fetching JSON: " + err);
    }
}

// Converts JSON from fetchJson() into a javascript dictionary
function jsonToDict(jsonStats, res) {
    var stats = jsonStats.playerstats.stats;
    var achivmentStats = jsonStats.playerstats.achivments;
    let dictStats = {}
    if (stats == null) {
        res.render('profile_not_found');
        return;
    } else {
        for (let i = 0; i < stats.length; i++) {
            dictStats[stats[i]['name']] = stats[i]['value'];
        }
        return dictStats;
    }

}

// Formats necessary stats from jsonToDict() and puts them into seperate ditionaries if needed 
function formatStats(statsDict) {
    let playtimeStats = {}
    let mapPlaytimeStats = {}

    for (var key in statsDict) {
        // Class, map, and MvM playtime stats
        if (key.endsWith(".accum.iPlayTime") && !MAPPREFIXES.some(substring => key.includes(substring))) {
            // Convert to hours
            statsDict[key] = (statsDict[key] / 3600).toFixed(2);
            if (!key.endsWith(".mvm.accum.iPlayTime")) {
                // Class playtime stats
                playtimeStats[key.replace(".accum.iPlayTime", "")] = statsDict[key];
            } else if (MAPPREFIXES.some(substring => key.includes(substring))) {
                // Map playtime stats
                mapPlaytimeStats[key.replace(".accum.iPlayTime", "")] = statsDict[key];
            }
        }
    }

    return statsDict;
}

// Render and send the stats to the ejs page
function renderStats(res, stats) {
    res.render('index', {
        playerStats: stats
    });
}


//--- FILES READING, WRITING, CREATION ---//

function createFile(filename) {
    console.log("Making file...")
    if (!fs.existsSync(filename)) {
        fs.closeSync(fs.openSync(filename, 'w'));
        console.log("File created")
    }
    else {
        console.log("File already exists")
    }
}

function readFile(filename) {
    try {
        const data = fs.readFileSync(filename, 'utf8')
        console.log(data)
        return data;
    } catch (err) {
        console.error(err);
        return 0;
    }
}

function writeFile(filename, content) {
    console.log("writing content:" + content)
    fs.writeFile(filename, content, err => {
        if (err) {
            console.error(err);
            return;
        }
    })
}

module.exports = { fetchJson, createFile, readFile, writeFile };