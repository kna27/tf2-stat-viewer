
const express = require('express')
const app = express()
dotenv = require('dotenv')

app.get('/', (req, res) => {
  res.send('Hello World!')
})

const result = dotenv.config()

if (result.error) {
  throw result.error
}

// JSON Request: http://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v2/?key=result.parsed.API_KEY&appid=440&steamid=76561198959991541&count=1&format=json

console.log(result.parsed.API_KEY)
app.listen(process.env.PORT || 5000);
console.log("Listening at http://127.0.0.1:5000");