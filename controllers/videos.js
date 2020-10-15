const axios = require('axios');
const Video = require('../models/video');
// const { router } = require('../routes/videos');

// Fetch videos from api request and store into database
exports.fetchVideos = async () => {
    try {
        const searchQueries = ['Barber trends', 'Cosmetic trends']
        for (var i = 0; i < searchQueries.length; i++) {
            const searchQuery=searchQueries[i] ;
            const maxResults=3;
            const response = await axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=${maxResults}&order=viewCount&q=${searchQuery}&type=video&key=${process.env.REACT_APP_YOUTUBE_KEY}` )
            .then(async videos => {
                let fetchedVideos = videos.data.items;
                for (var i = 0; i < fetchedVideos.length; i++) {
                    var temp = await axios.get(`https://www.googleapis.com/youtube/v3/videos?part=statistics&part=snippet&part=player&id=${fetchedVideos[i].id.videoId}&key=${process.env.REACT_APP_YOUTUBE_KEY}` );
                    var {items} = temp.data
                    var info = items[0]

                    /// Destructure or obtain all the variable information to pass to this object
                    var title = info.snippet.title;
                    var videoType = 'Trending';
                    var videoId = info.id;
                    var query = searchQuery;
                    var views = info.statistics.viewCount;
                    var tags = info.snippet.tags;
                    var embedLink = info.player.embedHtml;

                    const videos = new Video({title, videoType, videoId, query, views, tags, embedLink})
                        
                    videos.save((err, success) => {
                        if(err){
                            console.log(err)
                        }
                        // console.log(success)
                    })
                    
                }

            });
        }
        
    } catch (error) {
        console.log('________________________________________________');
        console.log(error.message);
    }
}

//URL/api/videos/cosmainVideos
exports.updateCosmainVideos= async () => {
//pull from cosmain channel
    try {
        console.log('------------Attempt----------------')
        const response = await axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${process.env.CHANNEL}&order=viewCount&type=video&key=${process.env.REACT_APP_YOUTUBE_KEY}` )
        .then(async videos => {
            console.log("------Fetched-------")
            let fetchedVideos = videos.data.items;
            for (var i = 0; i < fetchedVideos.length; i++) {
                var temp = await axios.get(`https://www.googleapis.com/youtube/v3/videos?part=statistics&part=snippet&part=player&id=${fetchedVideos[i].id.videoId}&key=${process.env.REACT_APP_YOUTUBE_KEY}` );
                console.log("------------Data " + i + " ---------")
                var {items} = temp.data;
                var info = items[0];

                let video = new Video({ 
                    title: info.snippet.title, 
                    videoType:'Interview', 
                    videoId: info.id, 
                    query:'Barber trends', 
                    embedLink: info.player.embedHtml, 
                    views: info.statistics.viewCount,
                    tags: info.snippet.tags
                });
                //store in mongodb
                video.save((err, success) => {
                    if(err) {
                        console.log(err)
                    }
                })
            }
        })
    }
    catch (error) {
        // res.status(404).json('Unable to connect to APIs');
        console.log('________________________________________________');
        console.log(error.message);
    }
}

// Retrieves videos from database
exports.getVideos = (req, res) => {
    const {videoType, searchQuery} = req.query;

    // Find function, returns array of all videos of this type
    Video.find({videoType: videoType, query: searchQuery})
    .then(videos => res.status(200).json(videos))
    .catch(err => res.status(404).json(err)); // Sending videos to front end of this type
}

exports.deleteVideos = (type) => {
    Video.remove({videoType: type}, (err, success) => {
        if(err){
            console.log(err)
        }
        console.log(success)
    })
}