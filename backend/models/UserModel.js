const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    score: {
        type: Number,
        require: true
    }
}, { timestamps: true })

const Users = mongoose.model('Users', userSchema);

module.exports = Users