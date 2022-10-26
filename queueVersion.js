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
