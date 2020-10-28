const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const cron = require('node-cron');
require('dotenv').config();
const { fetchVideos, deleteVideos } = require('./controllers/videos');



const User = require('./models/user');


// ROUTES
const videoRoutes = require('./routes/videos');
const userRoutes = require('./routes/users');
const app = express();

mongoose.connect(
    'mongodb+srv://Preston:PrestonDb@cosmainmedia.6u5pq.mongodb.net/cosmainmedia?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false 
    }
)
    .then(() => {
        console.log('Connected to database!');
    })
    .catch(() => {
        console.log('Connection failed!');
    })

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Video Route
app.use('/api/videos', videoRoutes);
app.use('/api/users', userRoutes);

cron.schedule('50 9 * * *', () => {
    deleteVideos('Trending');
    fetchVideos();
})

module.exports = app;