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
    professionalID: {
        type: String,
        required: true,
    },
    views: {
        type: Number
    },
    favorites: {
        type: Number,
        required: true,
    },
    duration: {
        type: Number,
        required: true,
    },
},
{
    timestamps: true
})

module.exports = mongoose.model('Videos', Videos)