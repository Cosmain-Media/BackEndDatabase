const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const Video = require('./models/video');
const axios = require('axios');
const cron = require('node-cron');
const videoController = require('./controllers/videos');
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


process.env['REACT_APP_YOUTUBE_KEY'] = "AIzaSyAEkMTfPnSXHHsa-wMUylIzIPHLMXSqEOk";
process.env['CHANNEL'] = "UCkG2U_6acwkGhgV_XJpy7ig";

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

cron.schedule('59 23 * * *', () => {
    const getTrending = async () => {
        const searchQuery=['Barber trends', 'Cosmetic trends', ]
        for(let i = 0; i < searchQuery.length; i++){
            try {
                const maxResults=3;
                // console.log(searchQuery[i])
                const response = await axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=${maxResults}&order=viewCount&q=${searchQuery[i]}&type=video&key=${process.env.REACT_APP_YOUTUBE_KEY}` )
                .then(async videos => {
                    let fetchedVideos = videos.data.items;
                    for (let j = 0; j < fetchedVideos.length; j++) {
                        let temp = await axios.get(`https://www.googleapis.com/youtube/v3/videos?part=statistics&part=snippet&part=player&id=${fetchedVideos[j].id.videoId}&key=${process.env.REACT_APP_YOUTUBE_KEY}` );
                        let {items} = temp.data
                        let info = items[0]

                        // Destructure or obtain all the variable information to pass to this object

                        let category = searchQuery[i];
                        let title = info.snippet.title;
                        let videoId = info.id;
                        let views = info.statistics.viewCount;
                        let tags = info.snippet.tags;
                        let html = info.player.embedHtml;
                        
                        const videos = new Video({category, title, videoId, views, tags, html})
                        
                        videos.save((err, success) => {
                            if(err){
                                console.log(err)
                            }
                            // console.log(success)
                        })
                    }
                });  
            } catch (error) {
                console.log('________________________________________________');
                console.log(error);
            }
        }
    }

    getTrending()

})

cron.schedule('50 23 * * *', () => {
    Video.remove({}, (err, success) => {
        if(err){
            console.log(err)
        }
        console.log(success)
    })
})

app.listen(3001, () => {
    console.log('App is running on port 3001');
});