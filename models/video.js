const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Videos = new Schema(
{
    category: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    videoType: {
        type: String,
    },
    videoId: {
        type: String,
        required: true,
    },
    profession: {
        type: String,
    },
    videoLink: {
        type: String,
    },
    views: {
        type: Number,
        required: true,
    },
    favoriteCount: {
        type: Number,
    },
    tags: [{
        type: String
    }],
    html: {
        type: String,
    },
    duration: {
        type: Number,
    },
},
{
    timestamps: true
})

module.exports = mongoose.model('Videos', Videos)