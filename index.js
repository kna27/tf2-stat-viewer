const express = require('express');
const fetch = require('node-fetch');
const app = express();
const settings = { method: "Get" };

app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.set('view engine', 'ejs');
app.get('/', (req, res) => res.render('index'));

function formatStats(jsonStats) {
  var stats = jsonStats.playerstats.stats;
  var achivmentStats = jsonStats.playerstats.achivments;
  var dictStats = {}
  for (let i = 0; i < stats.length; i++) {
    dictStats[stats[i]['name']] = stats[i]['value'];
  }

  return dictStats;
}

function renderStats(res, stats)
{
  res.render('index', {
    playerStats: stats    
  });
}

app.get('/profile/:id', (req, res) => {
  //76561198959991541
  var url = `http://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v2/?key=${process.env.API_KEY}&appid=440&steamid=76561198959991541&count=1&format=json`;
  fetch(url, settings)
    .then(res => res.json())
    .then((json) => {
      formattedStats = formatStats(json);
      renderStats(res, formattedStats);
    });
});

app.listen(process.env.PORT || 5000);
console.log("Listening at http://127.0.0.1:5000");