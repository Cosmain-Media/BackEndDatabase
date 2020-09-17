const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Professionals = new Schema(
{
    fullName: {
        type: String,
        required: true,
    },
    professionID: {
        type: Number,
        required: true,
    },
    imagePath: {
        type: String,
        required: true,
    },
    cosmainLink: {
        type: String,
    },
    videos: [],
},
{
    timestamps: true
})

module.exports = mongoose.model('Professionals', Professionals)