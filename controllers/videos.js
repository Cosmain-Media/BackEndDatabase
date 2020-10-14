const axios = require('axios')
const Video = require('../models/video');

exports.getTrending = async (req, res) => {
    try {
        const searchQuery=req.query.searchQuery;
        const maxResults=req.query.maxResults;
        var trendingVideos = [];
        const response = await axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=${maxResults}&order=viewCount&q=${searchQuery}&type=video&key=${process.env.REACT_APP_YOUTUBE_KEY}` )
        .then(async videos => {
            let fetchedVideos = videos.data.items;
            for (var i = 0; i < fetchedVideos.length; i++) {
                var temp = await axios.get(`https://www.googleapis.com/youtube/v3/videos?part=statistics&part=snippet&part=player&id=${fetchedVideos[i].id.videoId}&key=${process.env.REACT_APP_YOUTUBE_KEY}` );
                var {items} = temp.data;
                var info = items[0];

                /// Destructure or obtain all the variable information to pass to this object
                var videoId = info.id;
                var viewCount = info.statistics.viewCount;
                var title = info.snippet.title;
                var tags = info.snippet.tags;
                var embedded = info.player.embedHtml;
                
                trendingVideos.push({
                    videoId: videoId,
                    viewCount: viewCount,
                    title: title,
                    tags: tags,
                    embedded: embedded
                });
            }
            res.status(200).json({
                trendingVideos: trendingVideos,
                message: "Videos fetched successfully!"
            });
        });  
        
    } catch (error) {
        res.status(404).json('Unable to connect to APIs');
        console.log('________________________________________________');
        console.log(error.message);
    }
}

//URL/api/videos/cosmainVideos
exports.updateCosmainVideos= async (req, res) => {
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
                    profession:'Barber', 
                    embedLink: info.player.embedHtml, 
                    //views, 
                    //favoriteCount, 
                    tags: info.snippet.tags 
                    //duration
                });
                //store in mongodb
                video.save((err, success) => {
                    if(err) {
                        console.log(err)
                    }
                })
            }

            res.status(200).json({
                message: "Cosmain videos stored successfully!"
            })
        })
    }
    catch (error) {
        res.status(404).json('Unable to connect to APIs');
        console.log('________________________________________________');
        console.log(error.message);
    }
}
exports.getVideos = (req, res) => {

}