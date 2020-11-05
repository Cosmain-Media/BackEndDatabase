const mongoose = require('mongoose')
const Schema = mongoose.Schema
const uniqueValidator = require("mongoose-unique-validator");


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
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    favoritedVideos: [{
        type: String
    }]

},
{
    timestamps: true
})
Users.plugin(uniqueValidator);
module.exports = mongoose.model('Users', Users)