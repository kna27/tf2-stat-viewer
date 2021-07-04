const express = require('express');
const fetch = require('node-fetch');
const app = express();
const settings = { method: "Get" };

const MAPPREFIXES = ["arena_", "cp_", "ctf_", "koth_", "mvm_", "pass_", "pd_", "pl_", "plr_", "rd_", "sd_", "tc_", "tr_"];
const CLASSES = ["Scout", "Soldier", "Pyro", "Demoman", "Heavy", "Engineer", "Medic", "Sniper", "Spy"]

app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.get('/', (req, res) => res.render('index'));

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

function formatStats(statsDict) {
  let playtimeStats = {}
  let mapPlaytimeStats = {}

  for (var key in statsDict) {
    if (key.endsWith(".accum.iPlayTime") && !MAPPREFIXES.some(substring => key.includes(substring))) {
      statsDict[key] = (statsDict[key] / 3600).toFixed(2);
      if (!key.endsWith(".mvm.accum.iPlayTime")) {
        playtimeStats[key.replace(".accum.iPlayTime", "")] = statsDict[key];
      } else if (MAPPREFIXES.some(substring => key.includes(substring))) {
        mapPlaytimeStats[key.replace(".accum.iPlayTime", "")] = statsDict[key];
      }
    }
  }
  return statsDict;
}

function renderStats(res, stats) {
  res.render('index', {
    playerStats: stats
  });
}

app.get('/profile/:id', (req, res) => {
  fetch(`http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=${process.env.API_KEY}&steamids=${req.params.id}`, settings)
    .then(res => res.json())
    .then((json) => {
      if (json.response.players.length != 0) {
        fetchJson(req.params.id, req, res);
      }
      else {
        fetch(`http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=${process.env.API_KEY}&vanityurl=${req.params.id}`, settings)
          .then(res => res.json())
          .then((json) => {
            if (json.response.success == 1) {
              fetchJson(json.response.steamid, req, res);
            }
            else {
              res.render('404');
            }
          });
      }
    });
});

app.get("/home", (req, res) => {
  res.render('index');
});

app.get('*', function (req, res) {
  res.status(404).render('404');
});

app.listen(process.env.PORT || 5000);
console.log("Listening at http://127.0.0.1:5000");