const express = require('express')
const router = express.Router()
const {getTrending}  = require('../controllers/videos')

router.get('/trending', getTrending)

module.exports  = router
// API Key
// AIzaSyAEkMTfPnSXHHsa-wMUylIzIPHLMXSqEOk