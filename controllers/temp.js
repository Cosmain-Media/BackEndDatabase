const axios = require('axios')

exports.getTrending = async (req, res) => {

    try {
        const searchQuery=req.query.searchQuery;
        const maxResults=req.query.maxResults;
        console.log('Before .then');
        const response = await axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=${maxResults}&order=viewCount&q=${searchQuery}&type=video&key=${process.env.REACT_APP_YOUTUBE_KEY}` )
        .then(async (videos) => {
            console.log('Beginning of .then');
            let fetchedVideos = videos.data.items;
            let vidLinks = [];
            console.log('before for loop');
            for (var i = 0; i < fetchedVideos.length; i++) {
                var temp = await axios.get(`https://www.googleapis.com/youtube/v3/videos?part=player&id=${fetchedVideos[i].id.videoId}&key=${process.env.REACT_APP_YOUTUBE_KEY}` );
                vidLinks.push(temp);
            }
            console.log('vid Testing...')
            console.log(vidLinks);

            return vidLinks;
        })
        .then((videos) => {
            res.status(200).json({
                videoLinks: videos,
                message: "Videos fetched successfully!"
            });
        });

       // console.log(response.data);
      //  const vidData = response.data; 
        
        
    
        
        //const response = await axios.get(`https://www.googleapis.com/youtube/v3/videos?part=statistics&part=snippet&id=mv82s69NKNA&key=${process.env.REACT_APP_YOUTUBE_KEY}` )
        // console.log(snippet)

        // .then(videos => {
        //     res.status(200).json({
        //         message: "Posts fetched successfully!",
        //         youtubeVideos: videos,
        //     });
        // }
        // )   
        
    } catch (error) {
        //console.log(error)
        res.status(404).json('Unable to connect to APIs');
    }
    
}