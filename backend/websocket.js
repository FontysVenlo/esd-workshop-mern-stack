const { Server } = require('socket.io');
require('dotenv').config()

function setupWebSocket(server) {
    const io = new Server(server, {
        cors: {
            origin: process.env.FRONT_END_URL,
            methods: ["GET", "POST"],
            credentials: true, // Enable credentials (cookies, authorization headers)
        }
    });

    io.on("connection", (socket) => {
        console.log("socket connected:", socket.id);

        socket.on('disconnect', () => {
            console.log(`User back-end disconnected: ${socket.id}`);
        });

    })
    return io; // <-- must return this
}

module.exports = setupWebSocket;