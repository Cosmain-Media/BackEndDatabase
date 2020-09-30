const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Professions = new Schema(
{
    professionName: {
        type: String,
        required: true,
    },
    professionType: {
        type: String,
        required: true,
    }
}
)

module.exports = mongoose.model('Professions', Professions)