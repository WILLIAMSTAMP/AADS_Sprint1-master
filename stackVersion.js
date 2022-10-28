// Sprint 1 for algorithms class
// Due October 31st 2022
// Group members: Chris, Mark, William, Neil

const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");

const Stack = require("./stackClass");

// Request from server.
const agentRequestStack = async (message, agentID, structureID) => {
  let agent = {
    data: message,
    AgentID: agentID,
    StructureID: structureID,
  };
  try {
    if (!fs.existsSync(path.join(__dirname, "json", "stack.json"))) {
      fs.openSync(path.join(__dirname, "json", "stack.json"), "w");

      // Adding to the stack.
      const stack = new Stack.Stack();

      stack.push(agent);

      console.log("stack items:");
      console.log(stack.items);

      let messageJSON = JSON.stringify(stack.items, null, 2);
      console.log(messageJSON);
      await fsPromises.writeFile(
        path.join(__dirname, "json", "stack.json"),
        messageJSON
      );
    } else {
      const data = await fsPromises.readFile(
        path.join(__dirname, "json", "stack.json")
      );

      let agents = JSON.parse(data);
      console.log("Agents:");
      console.log(agents);
      const stack = new Stack.Stack();
      stack.items = agents;
      // Just to tell the stack how many items are there.
      stack.count = agents.length;

      stack.push(agent);
      console.log("stack items:");
      console.log(stack.items);

      let messageJSON = JSON.stringify(stack.items, null, 2);
      console.log(messageJSON);
      await fsPromises.writeFile(
        path.join(__dirname, "json", "stack.json"),
        messageJSON
      );
    }
    console.log(`${agent.AgentID}. has received a message`);
  } catch (err) {
    console.error(err);
  }
};

// Poping "data:" out of the stack and from the file.
const agentRetrieveStack = async () => {
  let obj = new Object();
  try {
    const data = await fsPromises.readFile(
      path.join(__dirname, "json", "stack.json")
    );

    let messages = JSON.parse(data);
    var lastelement = messages[messages.length - 1].data;
    const stack = new Stack.Stack();
    stack.items = messages;
    stack.count = messages.length;
    const remove = stack.pop();

    obj.AgentID = remove.AgentID;
    obj.StructureID = remove.StructureID;

    // stack.items *into* newItems *up to* stack.count number of items.
    let newItems = [];

    for (let i = 0; i < stack.count; i++) {
      newItems.push(stack.items[i]);
    }

    let messageJSON = JSON.stringify(newItems, null, 2);
    await fsPromises.writeFile(
      path.join(__dirname, "json", "stack.json"),
      messageJSON
    );
    await fs.writeFileSync(
      "./stack.html",
      `<!DOCTYPE html> \n <html lang="en"> \n <head> \n <style> \n #header { \n color: white \n} #top { \n margin-top: 200px; \n } \n table, th, td { \n border: 1px solid white; \n margin-top: 65px; \n color: white; \n margin-left: auto; \n margin-right: auto; \n } \n body { \n background-image: url(https://www.spy-games.com/wp-content/uploads/2016/12/cia-wallpaper-free-Download7-1.jpg); \n background-size: 100%;\n background-position-y: 25%; \n background-color: #1c2c44; \n background-repeat:no-repeat; \n min-width: 70%; \n text-align: center; \n box-sizing: border-box; \n font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif; \n } \n </style> \n <title>Node Stuff</title> \n <meta charset="UTF-8" /> \n <meta name="viewport" content="width=device-width,initial-scale=1" /> \n </head> \n <body> \n <header> \n <div id=header style="margin-top:200px;"> \n <span>Keyin College</span> \n <span>Semester 3 Sprint 1 - Full Stack Javascript</span> \n <span>Group 1</span> \n <h1>Stack Search Result:</h1> \n </div> \n </header> \n  <table> \n <tr> \n <th>Message</th> \n <td> +
    ${lastelement} </td> \n <a href="/"><button>Back to Home</button></a>`
    );
    console.log(`This message has self destructed...goodbye, ${obj.AgentID}.`);
  } catch (err) {
    console.log(err);
  }
  return obj;
};

module.exports = {
  agentRequestStack,
  agentRetrieveStack,
};
