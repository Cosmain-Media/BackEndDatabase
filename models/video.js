const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Videos = new Schema(
{
    title: {
        type: String,
        required: true,
    },
    videoType: {
        type: String,
        required: true
    },
    videoId: {
        type: String,
        required: true,
    },
    profession: {
        type: String,
        required: true
    },
    embedLink: {
        type: String,
        required: true,
    },
    views: {
        type: Number,
    },
    favoriteCount: {
        type: Number
    },
    tags: [{
        type: String
    }],
    duration: {
        type: Number
    },
},
{
    timestamps: true
})

module.exports = mongoose.model('Videos', Videos)