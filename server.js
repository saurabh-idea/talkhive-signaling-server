const WebSocket = require("ws");

const PORT = process.env.PORT || 3000;
const server = new WebSocket.Server({ port: PORT });

let clients = new Set();

server.on("connection", (socket) => {
    console.log("New client connected!");
    clients.add(socket);

    socket.on("message", (message) => {
        console.log("Received: " + message);
        // Broadcast message to all clients except sender
        clients.forEach(client => {
            if (client !== socket && client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });

    socket.on("close", () => {
        console.log("Client disconnected!");
        clients.delete(socket);
    });
});

console.log(`Signaling Server running on port ${PORT}`);
