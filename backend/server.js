require('dotenv').config()
const express = require('express');
const userRoutes = require('./routes/users');
const mongoose = require('mongoose');
const cors = require("cors");
const cookieParser = require('cookie-parser')

// Import WebSocket setup
const setupWebSocket = require('./websocket')
const http = require('http')


const allowedOrigins = [process.env.FRONT_END_URL];
//express app
const app = express();

// this line is so Express can parse JSON bodies - so when a post method is done and 
// req.body is needed the json can be parsed and the values can be taken
app.use(express.json());
app.use(cookieParser()); // <-- this line makes cookies available on req.cookies


app.use((req, res, next) => {
  console.log(req.path, req.method)
  next();
})

app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'OPTIONS', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cookie', 'Set-Cookie', 'Accept'],
  credentials: true,
  exposedHeaders: ['Set-Cookie'],

}));


// Handle preflight requests
// app.options('/.*', cors());

app.use('/api/routes', userRoutes)

// --- Create HTTP server and attach Socket.IO ---
const httpServer = http.createServer(app);

// Make `io` available to the rest of the app
const io = setupWebSocket(httpServer)

app.set('socketio', io);


console.log("FRONT_END_URL =", process.env.FRONT_END_URL);
console.log("BACKEND_PORT  =", process.env.BACKEND_PORT);


mongoose.connect(process.env.MONGO_DB_URL).then(() => {
  httpServer.listen(process.env.BACKEND_PORT, () => {
    console.log('SERVER IS RUNNING & connected to db & listening on port', process.env.BACKEND_PORT);
  })
}).catch((error) => { console.log(error) })

