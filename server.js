<<<<<<< HEAD
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const Video = require('./models/video');
const Category = require('./models/category');
require('dotenv').config();

// ROUTES

const videoRoutes = require('./routes/videos');

const app = express();

mongoose.connect(
    'mongodb+srv://Preston:PrestonDb@cosmainmedia.6u5pq.mongodb.net/cosmainmedia?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    }
    )
    .then(() => {
        console.log('Connected to database!');
    })
    .catch(() => {
        console.log('Connection failed!');
})

// const secondTutorial = new Video({
//     title: "Another Thing",
//     videoType: "tutorial",
//     videoLink: "https://www.youtube.com/watch?v=WU9HqmrOgpg",
//     professionalID: 3,
//     views: 1000,
//     favorites: 42,
//     duration: 2
// },);
// secondTutorial.save((err, secondTutorial) => {
//     if (err) {
//         return console.log(err);
//     }
//     return console.log('saved video');
// })

// const Pain = new Professional({
//     fullName: "Just Pain",
//     professionID: 2,
//     imagePath: 20
// },);
// Pain.save((err, Pain) => {
//     if (err) {
//         return console.log(err);
//     }
//     return console.log('saved prof');
// })


// Middleware
app.use(bodyParser.json());
app.use(cors());

// Roots Route
app.use('/api/videos', videoRoutes);

// Video Route
// app.post('/api/videos', (req, res) => {
//     const {videoType} = req.body;

//     // Find function, returns array of all videos of this type
//     Video.find({videoType: videoType})
//     .then(videos => res.json(videos)); // Sending videos to front end of this type
// });

// User Route

    //login
        //app.post('api/user/login', (req,res) => {})

    //signup
        //app.post('api/user/signup', (req,res) => {})

    // Send user model info when personal dashboard is requested

        //app.post('/api/dashboard', (req, res) => {})

//category and professions routes
    //get categories for side nav bar
        //app.get('/api/categories', (req, res) => {})
    
    //get professions by category
        //app.get('/api/?...'), (req, res) => {})


app.listen(3001, () => {
    console.log('App is running on port 3001');
});
=======
const app = require("./app");
const http = require("http");

const normalizePort = val => {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
};

const onError = error => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const bind = typeof port === "string" ? "pipe " + port : "port " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
};


const onListening = () => {
  const addr = server.address();
  const bind = typeof port === "string" ? "pipe " + port : "port " + port;
};

const port = normalizePort(process.env.PORT || "3001");
app.set("port", port);

const server = http.createServer(app);
server.on("error", onError);
server.on("listening", onListening);
server.listen(port);
>>>>>>> 059704a01f28caa6543fe4bc9033c54fc2c10244
