

require('dotenv').config()
const express = require('express');
const userRoutes = require('./routes/usersRoutes');
const cors = require("cors");
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser')
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
  credentials: true, // Enable cookies and credentials
  exposedHeaders: ['Set-Cookie'],
}));

// Express.js command used for setting up routing
app.use('/api/routes/users', userRoutes)


mongoose.connect(process.env.MONGO_DB_URL).then(() => {
  app.listen(process.env.BACKEND_PORT, () => {
    console.log('SERVER IS RUNNING & connected to db & listening on port', process.env.BACKEND_PORT);
  })
}).catch((error) => { console.log(error) })
