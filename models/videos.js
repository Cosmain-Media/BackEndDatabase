const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Videos = new Schema(
{
    title: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    link: {
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
    students: {
        type: Number,
        required: true,
    },
    time: {
        type: Number,
        required: true,
    },
},
{
    timestamps: true
})

module.exports = mongoose.model('Videos', Videos)