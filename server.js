// Sprint 1 for algorithms class
// Due October 31st 2022
// Group members: Chris, Mark, William, Neil

const http = require("http");
const fs = require("fs");
const path = require("path");
const url = require("url");
var express = require("express");
const port = 3000;
const { agentRequestStack, agentRetrieveStack } = require("./stackVersion");
const { agentRequestQueue, agentRetrieveQueue } = require("./queueVersion");
const css = path.dirname("./css");
var app = express();

app.set("etag", false);
app.set("view engine", "ejs");
app.use((req, res, next) => {
  res.set("Cache-Control", "no-store");
  next();
});
app.set("json", path.join(__dirname, "./"));

const server = http.createServer((req, res) => {
  console.log(req.method, req.url);

  if (req.url === "/") {
    let htmlPath = path.join(__dirname, "home.html");
    res.statusCode = 200;
    displayFile(htmlPath);
  } else if (req.url === "/sendQueue") {
    let htmlPath = path.join(__dirname, "messageQueue.html");
    res.statusCode = 200;
    displayFile(htmlPath);
  } else if (req.url.match("/requestQueue")) {
    const form_data = url.parse(req.url, true).query;

    agentRequestQueue(
      form_data.message,
      form_data.agentID,
      form_data.structureID
    );
    res.end(`Message request has been sent to Queue`);
  } else if (req.url === "/retrieveQueue") {
    const messageRetrieve = agentRetrieveQueue();
    let htmlPath = path.join(__dirname, "queue.html");
    res.statusCode = 200;
    displayFile(htmlPath);
  } else if (req.url === "/sendStack") {
    let htmlPath = path.join(__dirname, "messageStack.html");
    res.statusCode = 200;
    displayFile(htmlPath);
  } else if (req.url.match("/requestStack")) {
    const form_data = url.parse(req.url, true).query;
    res.end("Message sent successfully.");
    agentRequestStack(
      form_data.message,
      form_data.agentID,
      form_data.structureID
    );
  } else if (req.url.match("/retrieveStack")) {
    const messageRetrieve = agentRetrieveStack();
    messageRetrieve.then((data) => {
      let htmlPath = path.join(__dirname, "stack.html");
      res.statusCode = 200;
      displayFile(htmlPath);
    });
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.write("404 Not Found");
    res.end();
  }

  function displayFile(filename) {
    fs.readFile(filename, "UTF-8", (err, data) => {
      if (err) {
        console.error(err);
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("404 Not Found");
      } else {
        res.writeHead(res.statusCode, { "Content-Type": "text/html" });
        res.write(data);
        res.end();
      }
    });
  }
});

server.listen(port, "localhost", () => {
  console.log(
    `Secure messaging protocal initiated on port ${port}; Terminate connection after briefing to maintain optimal security! `
  );
});
