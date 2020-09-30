const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Category = new Schema(
{
    categoryName: {
        type: String,
        required: true,
    },
    professions: [{
        type: String,
        required: true
    }]
}
)

module.exports = mongoose.model('Category', Category)