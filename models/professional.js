const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Professionals = new Schema(
{
    name: {
        type: String,
        required: true,
    },
    profession: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    cosmainLink: {
        type: String,
    },
    videos: [],
    description: {
        type: String,
    }
},
{
    timestamps: true
})

module.exports = mongoose.model('Professionals', Professionals)