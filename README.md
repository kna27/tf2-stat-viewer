# TF2 Stat Viewer
[https://tf2stats.onrender.com/](https://tf2stats.onrender.com)
## About

A website where you can see your personal Team Fortress 2 statistics in graphs, tables, and charts using the Steam API! All you have to do is enter your Steam username.

This includes how long you've played each map, how much damage you've done as each class, how long you've played each class, your MvM statistics, and much more.

## Prerequisites

- Node.js >= 18.0.0
- A Redis instance (optional, for counting page views)

## Contributing

1. Install all dependencies:
   ```bash
   npm install
   ```

2. Get a [Steam API key](https://steamcommunity.com/dev/apikey).

3. Set up your environment variables in a `.env` file:
   ```env
   STEAM_API_KEY="Your_Steam_API_Key"
   REDIS_URL="redis://your-redis-url"
   ```

4. Run the application locally (defaults to port 3000):
   ```bash
   npm start
   ```
