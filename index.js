// Dependencies
const express = require('express');
const fetch = require('node-fetch');
const lib = require("./lib");

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

console.log("calling create file")
lib.createFile("./searches")
var searches = lib.readFile("./searches");

//--- ROUTING REQUESTS ---//

// Home page
app.get(["/", "/home"], (req, res) => res.render('index'));

// Profile pages
app.get('/profile/:id', (req, res) => {
  searches++;
  lib.writeFile("./searches", searches.toString());
  // Check if ID is a valid Steam account 
  fetch(`http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=${process.env.API_KEY}&steamids=${req.params.id}`, settings)
    .then(res => res.json())
    .then((json) => {
      if (json.response.players.length != 0) {
        // Fetch user stats JSON if it is
        lib.fetchJson(req.params.id, req, res);
      }
      else {
        // If it isn't a valid ID, check if it is a valid vanity URL
        fetch(`http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=${process.env.API_KEY}&vanityurl=${req.params.id}`, settings)
          .then(res => res.json())
          .then((json) => {
            if (json.response.success == 1) {
              // Fetch JSON using vanity URL's ID
              lib.fetchJson(json.response.steamid, req, res);
            }
            else {
              // User didn't submit a valid account, send 404 page
              res.render('profile_not_found');
            }
          });
      }
    });
});

// About page
app.get("/about", (req, res) => res.render('about'));

// Catch all other pages and serve 404 error page
app.get('*', function (req, res) {
  res.status(404).render('404');
});

// Start Express server
app.listen(process.env.PORT || 5000);
console.log("Listening at http://127.0.0.1:5000");