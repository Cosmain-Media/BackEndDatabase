const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const cron = require('node-cron');
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

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Video Route
app.use('/api/videos', videoRoutes)

cron.schedule('59 23 * * *', () => {
    fetchVideos();
})

cron.schedule('50 23 * * *', () => {
    deleteVideos();
})

app.listen(3001, () => {
    console.log('App is running on port 3001');
});