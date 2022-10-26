// Sprint 1 for algorithms class
// Due October 31st 2022
// Group members: Chris, Mark, William

const http = require("http");
const fs = require("fs");
const path = require("path");
const url = require("url");
var express = require("express");
const port = 3000;
const { agentRequestStack, agentRetrieveStack } = require("./stackVersion");
const { agentRequestQueue, agentRetrieveQueue } = require("./queueVersion");
const css = path.dirname("./css")
var app = express();


app.set("view engine", "ejs");
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
    messageRetrieve.then((data) => {
      res.end(JSON.stringify(data, null, 2));
    });

  } else if (req.url === "/sendStack") {
    let htmlPath = path.join(__dirname, "messageStack.html" ,);
    res.statusCode = 200;
    displayFile(htmlPath);
  } else if (req.url.match("/requestStack")) {
    const form_data = url.parse(req.url, true).query;
    




  //   app.get("/", function (req, res) {
  //     res.render(__dirname + "/json" + "stack.ejs");
  // });
// 
// 
// res.render outside of {}

    app.get("/agentRequestStack", function (req, res) {
    agentRequestStack(
      form_data.message,
      form_data.agentID,
      form_data.structureID,
      fs.writeFileSync("./stack.ejs", '<!DOCTYPE html> \n <html lang="en"> \n <head> \n <style> \n #top { \n margin-top: 200px; \n } \n table, th, td { \n border: 1px solid black; \n margin-top: 65px; \n margin-left: auto; \n margin-right: auto; \n } \n body { \n background-image: url(https://keyin.com/wp-content/uploads/BLANKshareable2.png); \n background-size: 100%;\n background-position-y: 25%; \n background-color: #1c2c44; \n background-repeat:no-repeat; \n min-width: 70%; \n text-align: center; \n box-sizing: border-box; \n font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif; \n } \n </style> \n <title>Node Stuff</title> \n <meta charset="UTF-8" /> \n <meta name="viewport" content="width=device-width,initial-scale=1" /> \n </head> \n <body> \n <header> \n <div id=header style="margin-top:200px;"> \n <span>Keyin College</span> \n <span>Semester 3 Sprint 1 - Full Stack Javascript</span> \n <span>Group 1</span> \n </div> \n </header> \n <h1>Token Search Result:</h1> \n <table> \n <tr> \n <th>Username:</th> \n <td>'+ form_data.message));
      
    res.end("Message sent successfully.")
  } else if (req.url === "/retrieveStack") {
    res.render(__dirname + "/" + "stack.ejs")}    
    const messageRetrieve = agentRetrieveStack();
    messageRetrieve.then((data) => {
      
    });

  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.write("404 Not Found");
    res.end();
  }

// 
// 

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
