const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const Video = require('./models/video');
const Category = require('./models/category');

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

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Root Route
app.get('/', (req, res) => {res.send('The root route is working fine')});

// Video Route
app.post('/api/videos', (req, res) => {
    const {videoType} = req.body;

    // Find function, returns array of all videos of this type
    Video.find({videoType: videoType})
    .then(videos => res.json(videos)); // Sending videos to front end of this type
});

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