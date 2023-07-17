const fetch = require('node-fetch')
const express = require("express");
const { scrapeLogic } = require("./api/scrapeLogic");
const app = express();
app.set("trust proxy", true);

const PORT = process.env.PORT || 4000;

app.get("/search", (req, res) => {
  scrapeLogic(req, res);
});



app.get("/", (req, res) => {
  res.send("Render Puppeteer server is up and running!");
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
