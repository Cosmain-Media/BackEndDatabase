<<<<<<< HEAD
const express = require('express');
const router = express.Router();
const  videoController  = require('../controllers/videos');
=======
const express = require('express')
const router = express.Router()
const {getVideos, updateCosmainVideos}  = require('../controllers/videos')
>>>>>>> 059704a01f28caa6543fe4bc9033c54fc2c10244

router.get('/cosmainVideos', updateCosmainVideos);
router.get('/all', getVideos);

<<<<<<< HEAD
router.get('/trending', videoController.getTrending);
router.get('/cosmainVideos', videoController.updateCosmainVideos);

module.exports  = router
// API Key
// AIzaSyAEkMTfPnSXHHsa-wMUylIzIPHLMXSqEOk
=======
module.exports  = router;
>>>>>>> 059704a01f28caa6543fe4bc9033c54fc2c10244
