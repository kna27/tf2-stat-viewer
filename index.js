const express = require('express');
const fetch = require('node-fetch');
const app = express();
const settings = { method: "Get" };

const mapPrefixes = ["pl_", "ctf_", "cp_", "koth_", "plr_"];

app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.get('/', (req, res) => res.render('index'));

function fetchJson(req, res) {
  var url = `http://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v2/?key=${process.env.API_KEY}&appid=440&steamid=${req.params.id}&count=1&format=json`;
  try {
    fetch(url, settings)
      .then(res => res.json())
      .then((json) => {
        let allStats = formatStats(jsonToDict(json));
        renderStats(res, allStats);
      });
  } catch (err) {
    console.log("caught" + err);
  }
}

function jsonToDict(jsonStats) {
  var stats = jsonStats.playerstats.stats;
  var achivmentStats = jsonStats.playerstats.achivments;
  let dictStats = {}
  for (let i = 0; i < stats.length; i++) {
    dictStats[stats[i]['name']] = stats[i]['value'];
  }
  return dictStats;
}

function formatStats(statsDict) {
  let playtimeStats = {}

  for (var key in statsDict) {
    if (key.endsWith(".accum.iPlayTime") && !mapPrefixes.some(substring => key.includes(substring))) {
      if (!key.endsWith(".mvm.accum.iPlayTime")) {
        playtimeStats[key.replace(".accum.iPlayTime", "")] = statsDict[key];
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
        fetchJson(req, res);
      }
      else {
        res.render('404');
      }
    })

});

app.get("/home", (req, res) => {
  res.render('index');
});

app.get('*', function (req, res) {
  res.status(404).render('404');
});

app.listen(process.env.PORT || 5000);
console.log("Listening at http://127.0.0.1:5000");