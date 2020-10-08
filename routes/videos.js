const express = require('express')
const router = express.Router()
const  videoController  = require('../controllers/videos')


router.get('/trending', videoController.getTrending)

module.exports  = router
// API Key
// AIzaSyAEkMTfPnSXHHsa-wMUylIzIPHLMXSqEOk