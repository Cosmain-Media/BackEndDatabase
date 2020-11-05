const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const cron = require('node-cron');
require('dotenv').config();
const { fetchVideos, deleteVideos } = require('./controllers/videos');

process.env.JWT_KEY="secret_this_should_be_longer";

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
app.use((req, res, next) => {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
      );
      res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, PUT, DELETE, OPTIONS"
      );
      next();
    });

// Video Route
app.use('/api/videos', videoRoutes);
app.use('/api/users', userRoutes);

cron.schedule('50 9 * * *', () => {
    deleteVideos('Trending');
    fetchVideos();
})

module.exports = app;