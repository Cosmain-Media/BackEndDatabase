const express = require('express')
const router = express.Router()
const {getVideos, updateCosmainVideos}  = require('../controllers/videos')

router.get('/cosmainVideos', updateCosmainVideos);
router.get('/all', getVideos);

module.exports  = router;
