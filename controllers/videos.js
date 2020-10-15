<<<<<<< HEAD
const axios = require('axios')
=======
const axios = require('axios');
const Video = require('../models/video');
// const { router } = require('../routes/videos');

// Fetch videos from api request and store into database
exports.fetchVideos = async () => {
    try {
        const professions = ['Barber', 'Cosmetic'];
        for (var i = 0; i < professions.length; i++) {
            const maxResults=3;
            const professional = professions[i];
            const response = await axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=${maxResults}&order=viewCount&q=${professional + ' trends'}&type=video&key=${process.env.REACT_APP_YOUTUBE_KEY}` )
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
                    var profession = professional;
                    var views = info.statistics.viewCount;
                    var tags = info.snippet.tags;
                    var embedLink = info.player.embedHtml;

                    const videos = new Video({title, videoType, videoId, profession, views, tags, embedLink})
                        
                    videos.save((err, success) => {
                        if(err){
                            console.log(err)
                        }
                    })
                    
                }
>>>>>>> 059704a01f28caa6543fe4bc9033c54fc2c10244

            });
        }
        
    } catch (error) {
        console.log('________________________________________________');
        console.log(error.message);
    }
}

//URL/api/videos/cosmainVideos
exports.updateCosmainVideos= async (req, res) => {
    this.deleteVideos("Not Trending");
//pull from cosmain channel
    try {
<<<<<<< HEAD
        const searchQuery=req.query.searchQuery;
        const maxResults=req.query.maxResults;
        var trendingVideos = [];
        const response = await axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=${maxResults}&order=viewCount&q=${searchQuery}&type=video&key=AIzaSyAEkMTfPnSXHHsa-wMUylIzIPHLMXSqEOk` )
        .then(async videos => {
            let fetchedVideos = videos.data.items;
            for (var i = 0; i < fetchedVideos.length; i++) {
                var temp = await axios.get(`https://www.googleapis.com/youtube/v3/videos?part=statistics&part=snippet&part=player&id=${fetchedVideos[i].id.videoId}&key=AIzaSyAEkMTfPnSXHHsa-wMUylIzIPHLMXSqEOk` );
                var {items} = temp.data
                var info = items[0]

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
=======
        const response = await axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${process.env.CHANNEL}&order=viewCount&type=video&key=${process.env.REACT_APP_YOUTUBE_KEY}` )
        .then(async videos => {
            let fetchedVideos = videos.data.items;
            for (var i = 0; i < fetchedVideos.length; i++) {
                var temp = await axios.get(`https://www.googleapis.com/youtube/v3/videos?part=statistics&part=snippet&part=player&id=${fetchedVideos[i].id.videoId}&key=${process.env.REACT_APP_YOUTUBE_KEY}` );
                var {items} = temp.data;
                var info = items[0];

                let video = new Video({ 
                    title: info.snippet.title, 
                    videoType:'Interview', 
                    videoId: info.id, 
                    profession:'Barber', 
                    embedLink: info.player.embedHtml,
                    views: info.statistics.viewCount,
                    tags: info.snippet.tags
>>>>>>> 059704a01f28caa6543fe4bc9033c54fc2c10244
                });
                //store in mongodb
                video.save((err, success) => {
                    if(err) {
                        console.log(err)
                    }
                })
                res.status(200).json('Cosmain Videos stored in Mongo Successfully');
            }
        })
    }
    catch (error) {
        res.status(404).json('Unable to connect to APIs');
        console.log('________________________________________________');
        console.log(error.message);
<<<<<<< HEAD
    }  
};
exports.updateCosmainVideos = (req,res) => {
    
}
=======
    }
}

// Retrieves videos from database
exports.getVideos = (req, res) => {
    const {videoType, profession} = req.query;

    // Find function, returns array of all videos of this type
    Video.find({videoType: videoType, profession: (profession)})
    .then(videos => res.status(200).json(videos))
    .catch(err => res.status(404).json(err)); // Sending videos to front end of this type
}

exports.deleteVideos = (type) => {
    if(type === "Not Trending"){
        Video.deleteMany({videoType: {$not: {$eq: "Trending"}}}, (err, success) =>{
            if(err){
                console.log(err)
            }
            console.log(success);
        })
    }
    else{
        Video.deleteMany({videoType: type}, (err, success) => {
            if(err){
                console.log(err)
            }
            console.log(success)
        })
    }
}


>>>>>>> 059704a01f28caa6543fe4bc9033c54fc2c10244
