
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(process.env.PORT || 5000);
console.log("Listening at http://127.0.0.1:5000");