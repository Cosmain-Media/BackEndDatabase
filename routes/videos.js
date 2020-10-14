const express = require('express')
const router = express.Router()
const {getTrending, updateCosmainVideos, getVideos}  = require('../controllers/videos')

router.get('/cosmainVideos', updateCosmainVideos);
router.get('/getVideos', getVideos);
router.get('/trending', getTrending)

module.exports  = router
