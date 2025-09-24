require('dotenv').config()
const express = require('express');
const userRoutes = require('./routes/users');
const mongoose = require('mongoose');
const { error } = require('console');
const cors = require("cors");

const allowedOrigins = [process.env.FRONT_END_URL, process.env.MONGO_DB_URL];
//express app
const app = express();

// this line is so Express can parse JSON bodies - so when a post method is done and 
// req.body is needed the json can be parsed and the values can be taken
app.use(express.json());


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
// app.options('*', cors());

app.use('/api/routes', userRoutes)

mongoose.connect(process.env.MONGO_DB_URL).then(() => {
  app.listen(process.env.BACKEND_PORT, () => {
    console.log('connected to db & listenig to 4000...');
  })
}).catch((error) => { console.log(error) })

