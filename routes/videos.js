const express = require('express')
const router = express.Router()
const  videoController  = require('../controllers/videos')


router.get('/trending', videoController.getTrending);
router.get('/cosmainVideos', videoController.updateCosmainVideos);
router.get('/getVideos', videoController.getVideos);

module.exports  = router
// API Key
// AIzaSyAEkMTfPnSXHHsa-wMUylIzIPHLMXSqEOk