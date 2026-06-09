// Dependencies
require("dotenv").config();
const express = require("express");
const lib = require("./lib");

// Create Express sever
const app = express();

// JSON request settings
const settings = { method: "Get" };

// Use body-parser and JSON in the express app
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve everything in the public directory
app.use(express.static(__dirname + "/public", { maxAge: "1d" }));

// Use ejs as the view engine
app.set("view engine", "ejs");

//--- ROUTING REQUESTS ---//

// Home page
app.get("/", (req, res) => res.render("index"));

// Profile pages
app.get(["/profile", "/profile/"], (req, res) => res.redirect("/"));

app.get("/profile/*id", async (req, res) => {
    try {
        await lib.incrementViews();

        let rawId = req.params.id;
        let fullPath = (Array.isArray(rawId) ? rawId.join("/") : rawId) || "";
        let id = (fullPath.replace(/\/$/, '').split('/').pop() || "").trim();

        if (!id) {
            return res.redirect("/");
        }

        // Check if ID is a valid Steam account
        let response = await fetch(
            `http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=${process.env.STEAM_API_KEY}&steamids=${id}`,
            settings,
        );
        let json = await response.json();

        if (
            json.response &&
            json.response.players &&
            json.response.players.length !== 0
        ) {
            // Fetch user stats JSON if it is
            await lib.fetchJson(
                id,
                req,
                res,
                json.response.players[0]["avatarfull"],
                json.response.players[0]["personaname"],
            );
        } else {
            // If it isn't a valid ID, check if it is a valid vanity URL
            response = await fetch(
                `http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=${process.env.STEAM_API_KEY}&vanityurl=${id}`,
                settings,
            );
            json = await response.json();

            if (json.response && json.response.success === 1) {
                // Fetch JSON using vanity URL's ID
                let infoResponse = await fetch(
                    `http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=${process.env.STEAM_API_KEY}&steamids=${json.response.steamid}`,
                    settings,
                );
                let infoJson = await infoResponse.json();

                if (
                    infoJson.response &&
                    infoJson.response.players &&
                    infoJson.response.players.length !== 0
                ) {
                    await lib.fetchJson(
                        json.response.steamid,
                        req,
                        res,
                        infoJson.response.players[0]["avatarfull"],
                        infoJson.response.players[0]["personaname"],
                    );
                } else {
                    res.render("profile_not_found");
                }
            } else {
                // User didn't submit a valid account, send 404 page
                res.render("profile_not_found");
            }
        }
    } catch (error) {
        console.error("Error processing profile route:", error);
        if (!res.headersSent) {
            res.render("profile_not_found");
        }
    }
});

// About page
app.get("/about", (req, res) => res.render("about"));

// Catch all other pages and serve 404 error page
app.use(function (req, res) {
    res.status(404).render("404");
});

// Start Express server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Listening at http://127.0.0.1:${PORT}`);
});
