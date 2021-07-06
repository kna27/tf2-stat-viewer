// Dependencies
const express = require('express');
const fetch = require('node-fetch');

// TF2 specific constants used when parsing JSON
const MAPPREFIXES = ["arena_", "cp_", "ctf_", "koth_", "mvm_", "pass_", "pd_", "pl_", "plr_", "rd_", "sd_", "tc_", "tr_"];
const CLASSES = ["Scout", "Soldier", "Pyro", "Demoman", "Heavy", "Engineer", "Medic", "Sniper", "Spy"];

// Create Express sever
const app = express();

// JSON request settings
const settings = { method: "Get" };

// Use body-parser and JSON in the express app
app.use(express.urlencoded({ extended: true }))
app.use(express.json());

// Serve everything in the public directory
app.use(express.static(__dirname + '/public'));

// Use ejs as the view engine
app.set('view engine', 'ejs');

// Used to check if JSON is not an HTML response and parses it
async function safeParseJSON(response, res) {
  const body = await response.text();
  try {
    return JSON.parse(body);
  } catch (err) {
    console.error("Error Parsing JSON:", err);
    console.error("Response body:", body);
    res.render('404');
  }
}

// Fetches player stats JSON from the Steam API 
function fetchJson(id, req, resp) {
  var url = `http://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v2/?key=${process.env.API_KEY}&appid=440&steamid=${id}&count=1&format=json`;
  try {
    fetch(url, settings).catch((err) => {
      resp.render('404');
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
          resp.render('404');
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
    res.render('404');
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


//--- ROUTING REQUESTS ---//

// Home page
app.get(["/", "/home"], (req, res) => res.render('index'));

// Profile pages
app.get('/profile/:id', (req, res) => {
  // Check if ID is a valid Steam account 
  fetch(`http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=${process.env.API_KEY}&steamids=${req.params.id}`, settings)
    .then(res => res.json())
    .then((json) => {
      if (json.response.players.length != 0) {
        // Fetch user stats JSON if it is
        fetchJson(req.params.id, req, res);
      }
      else {
        // If it isn't a valid ID, check if it is a valid vanity URL
        fetch(`http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=${process.env.API_KEY}&vanityurl=${req.params.id}`, settings)
          .then(res => res.json())
          .then((json) => {
            if (json.response.success == 1) {
              // Fetch JSON using vanity URL's ID
              fetchJson(json.response.steamid, req, res);
            }
            else {
              // User didn't submit a valid account, send 404 page
              res.render('404');
            }
          });
      }
    });
});

// Catch all other pages and serve 404 error page
app.get('*', function (req, res) {
  res.status(404).render('404');
});

// Start Express server
app.listen(process.env.PORT || 5000);
console.log("Listening at http://127.0.0.1:5000");