const express = require('express')
const router = express.Router()
const {getVideos, updateCosmainVideos,favoriteVideo }  = require('../controllers/videos')
const checkAuth = require("../middleware/check-auth")

router.get('/cosmainVideos', updateCosmainVideos)

router.get('/all', getVideos)

router.get("/favorite/:id",checkAuth, favoriteVideo)

module.exports  = router;
