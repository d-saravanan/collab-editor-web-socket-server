// Importing the required modules
const WebSocketServer = require('ws');

// Creating a new websocket server
const wss = new WebSocketServer.Server({ host: "192.168.187.2", port: 9090 })

const clients = new Set();

// Creating connection using websocket
wss.on("connection", ws => {
    console.log("new client connected");
    clients.add(ws);
    // sending message
    ws.on("message", data => {
        const msgReceived = new Buffer.from(data).toString();

        const codeSnippet = JSON.parse(msgReceived);

        console.log(msgReceived);
        for (var client of clients) {
            client.send(codeSnippet['snippet']);
        }
    });
    // handling what to do when clients disconnects from server
    ws.on("close", () => {
        console.log("the client has connected");
    });
    // handling client connection error
    ws.onerror = function () {
        console.log("Some Error occurred")
    }
});
console.log("The WebSocket server is running on port 9090");