const fetch = require('node-fetch')
const express = require("express");
const { scrapeLogic } = require("./api/scrapeLogic");
const fs = require('fs');
const path = require('path');

const app = express();

const PORT = process.env.PORT || 4000;

app.get("/api/search", (req, res) => {
  scrapeLogic(req, res);
});

app.get("/", (req, res) => {
  res.send("Render Puppeteer server is up and running!");
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

app.get('/openapi.yaml', (req, res) => {
  const host = req.headers.host;
  fs.readFile('openapi.yaml', 'utf8', (err, data) => {
      if (err) {
          console.error(err);
          res.status(500).send('An error occurred while reading the file.');
          return;
      }
      const text = data.replace('PLUGIN_HOSTNAME', `https://${host}`);
      res.set('Content-Type', 'text/yaml');
      res.send(text);
  });
});


app.get('/.well-known/ai-plugin.json', (req, res) => {
  const host = req.headers.host;
  const filePath = path.join(__dirname, '.well-known', 'ai-plugin.json');
  fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
          console.error(err);
          res.status(500).send('An error occurred while reading the file.');
          return;
      }
      const text = data.replace('PLUGIN_HOSTNAME', `http://${host}`);
      res.set('Content-Type', 'application/json');
      res.send(text);
  });
});


app.get('/OneForOneLogo.svg', (req, res) => {
  const filename = path.join(__dirname, 'OneForOneLogo.svg');
  res.sendFile(filename, (err) => {
      if (err) {
          console.error(err);
          res.status(500).send('An error occurred while sending the file.');
      }
  });
});