const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    score: {
        type: Number,
        required: true
    }
}, { timestamps: true })

const Users = mongoose.model('users', userSchema);
module.exports = Users