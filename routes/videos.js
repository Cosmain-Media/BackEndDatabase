const express = require('express')
const router = express.Router()
const {fetchVideos, getVideos, updateCosmainVideos, searchVideos}  = require('../controllers/videos')

router.get('/cosmainVideos', updateCosmainVideos);
router.get('/all', getVideos);
router.get('/fetch', fetchVideos);
router.get('/search', searchVideos);

module.exports  = router;