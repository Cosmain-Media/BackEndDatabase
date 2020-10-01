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
        required: true,
    },
    videoLink: {
        type: String,
        required: true,
    },
    views: {
        type: Number
    },
    favoriteCount: {
        type: Number,
        required: true,
    },
    tags: [{
        type: String
    }],
    duration: {
        type: Number,
        required: true,
    },
},
{
    timestamps: true
})

module.exports = mongoose.model('Videos', Videos)