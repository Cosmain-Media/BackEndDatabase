const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const cron = require('node-cron');
require('dotenv').config();
const {fetchVideos, updateCosmainVideos, getVideos, deleteVideos} = require('./controllers/videos');

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

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Video Route
app.use('/api/videos', videoRoutes)

cron.schedule('25 9 * * *', () => {
    deleteVideos('Trending');
    fetchVideos();
})

module.exports = app;