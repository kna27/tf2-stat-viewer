const express = require('express');
const fetch = require('node-fetch');
const app = express();
const settings = { method: "Get" };

app.use(express.urlencoded());
app.use(express.json());
app.set('view engine', 'ejs');
app.get('/', (req, res) => res.render('index'));

app.post('/upload', (req, res) => {
  // 76561198959991541
  var url = `http://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v2/?key=${process.env.API_KEY}&appid=440&steamid=${req.body.steamid}&count=1&format=json`;
  fetch(url, settings)
    .then(res => res.json())
    .then((json) => {
        console.log(json);
  });
});

app.listen(process.env.PORT || 5000);
console.log("Listening at http://127.0.0.1:5000");