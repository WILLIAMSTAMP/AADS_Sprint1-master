// Sprint 1 for algorithms class
// Due October 31st 2022
// Group members: Chris, Mark, William

const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");

const Queue = require("./queueClass");

// Request from server.
const agentRequestQueue = async (message, agentID, structureID) => {
  let agent = {
    data: message,
    AgentID: agentID,
    StructureID: structureID,
  };
  try {
    if (!fs.existsSync(path.join(__dirname, "json", "queue.json"))) {
      fs.openSync(path.join(__dirname, "json", "queue.json"), "w");

      // Adding to the queue.
      const queue = new Queue.Queue();

      queue.enqueue(agent);

      console.log("queue items:");
      console.log(queue.items);

      let messageJSON = JSON.stringify(queue.items, null, 2);
      console.log(messageJSON);
      await fsPromises.writeFile(
        path.join(__dirname, "json", "queue.json"),
        messageJSON
      );
    } else {
      const data = await fsPromises.readFile(
        path.join(__dirname, "json", "queue.json")
      );

      let agents = JSON.parse(data);
      const queue = new Queue.Queue();
      queue.items = agents;
      queue.count = agents.length;

      queue.enqueue(agent);
      console.log("queue items:");
      console.log(queue.items);

      let messageJSON = JSON.stringify(queue.items, null, 2);
      console.log(messageJSON);
      await fsPromises.writeFile(
        path.join(__dirname, "json", "queue.json"),
        messageJSON
      );
    }
    console.log(`Agent ${agent.AgentID} has received a new message`);
  } catch (err) {
    console.log(err);
  }
};

// dequeue "data:" out of the queue and from the file.
const agentRetrieveQueue = async () => {
  let obj = new Object();
  try {
    const data = await fsPromises.readFile(
      path.join(__dirname, "json", "queue.json")
    );

    let messages = JSON.parse(data);
    var lastelement = messages[(messages.length, 1)].data;
    const queue = new Queue.Queue();
    queue.items = messages;
    queue.count = messages.length;
    queue.lowestCount = 0;
    const remove = queue.dequeue();

    obj.AgentID = remove.AgentID;
    obj.StructureID = remove.StructureID;

    let newItems = [];

    for (let i = queue.lowestCount; i < queue.count; i++) {
      newItems.push(queue.items[i]);
    }
    let messageJSON = JSON.stringify(newItems, null, 2);

    await fsPromises.writeFile(
      path.join(__dirname, "json", "queue.json"),
      messageJSON
    );
    await fs.writeFileSync(
      "./queue.html",
      `<!DOCTYPE html> \n <html lang="en"> \n <head> \n <style> \n #header { \n color: white \n} #top { \n margin-top: 200px; \n } \n table, th, td { \n border: 1px solid white; \n margin-top: 65px; \n color: white; \n margin-left: auto; \n margin-right: auto; \n } \n body { \n background-image: url(https://www.spy-games.com/wp-content/uploads/2016/12/cia-wallpaper-free-Download7-1.jpg); \n background-size: 100%;\n background-position-y: 25%; \n background-color: #1c2c44; \n background-repeat:no-repeat; \n min-width: 70%; \n text-align: center; \n box-sizing: border-box; \n font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif; \n } \n </style> \n <title>Node Stuff</title> \n <meta charset="UTF-8" /> \n <meta name="viewport" content="width=device-width,initial-scale=1" /> \n </head> \n <body> \n <header> \n <div id=header style="margin-top:200px;"> \n <span>Keyin College</span> \n <span>Semester 3 Sprint 1 - Full Stack Javascript</span> \n <span>Group 1</span> \n <h1>Queue Search Result:</h1> \n </div> \n </header> \n  <table> \n <tr> \n <th>Message</th> \n <td> +
    ${lastelement} </td> \n <a href="/"><button>Back to Home</button></a>`
    );
    console.log(`This message has self destructed...goodbye ${obj.AgentID}.`);
  } catch (err) {
    console.log(err);
  }
  return obj;
};

module.exports = {
  agentRequestQueue,
  agentRetrieveQueue,
};
