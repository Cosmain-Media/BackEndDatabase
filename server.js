const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const Video = require('./models/video');
const axios = require('axios');
const cron = require('node-cron');
const videoController = require('./controllers/videos');
require('dotenv').config();

process.env['REACT_APP_YOUTUBE_KEY'] = "AIzaSyAEkMTfPnSXHHsa-wMUylIzIPHLMXSqEOk";
process.env['CHANNEL'] = "UCkG2U_6acwkGhgV_XJpy7ig";

// ROUTES

const videoRoutes = require('./routes/videos');
// const { default: getVideos } = require('../FrontEndWebsite/src/services/video');

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


process.env['REACT_APP_YOUTUBE_KEY'] = "AIzaSyAEkMTfPnSXHHsa-wMUylIzIPHLMXSqEOk";
process.env['CHANNEL'] = "UCkG2U_6acwkGhgV_XJpy7ig";

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Roots Route
app.use('/api/videos', videoRoutes);

cron.schedule('59 23 * * *', () => {
    videoController.fetchVideos();
})

cron.schedule('50 23 * * *', () => {
    videoController.deleteVideos();
})

app.listen(3001, () => {
    console.log('App is running on port 3001');
});