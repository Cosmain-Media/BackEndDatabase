const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Users = new Schema(
{
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: Number,
        required: true,
    },
    favoritedVideos: [{
        type: Number,
        required: true,
    }]
},
{
    timestamps: true
})

module.exports = mongoose.model('Users', Users)