const express = require('express');
const fetch = require('node-fetch');
const app = express();
const settings = { method: "Get" };

const mapPrefixes = ["arena_", "cp_", "ctf_", "koth_", "mvm_", "pass_", "pd_", "pl_", "plr_", "rd_", "sd_", "tc_", "tr_"];

app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.get('/', (req, res) => res.render('index'));

function fetchJson(id, req, resp) {
  var url = `http://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v2/?key=${process.env.API_KEY}&appid=440&steamid=${id}&count=1&format=json`;
  try {
    fetch(url, settings).catch((err) => {
      resp.render('404');
      console.log("Error fetching JSON: " + err)
      return;
    })
      .then(res => res.json())
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
    if (key.endsWith(".accum.iPlayTime") && !mapPrefixes.some(substring => key.includes(substring))) {
      if (!key.endsWith(".mvm.accum.iPlayTime")) {
        playtimeStats[key.replace(".accum.iPlayTime", "")] = statsDict[key];
      } else if (mapPrefixes.some(substring => key.includes(substring))) {
        mapPlaytimeStats[key.replace(".accum.iPlayTime", "")] = statsDict[key];
      }
    }
  }
  return [playtimeStats, statsDict];
}

function renderStats(res, stats) {
  res.render('index', {
    playtimeStats: stats[0],
    playerStats: stats[1]
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