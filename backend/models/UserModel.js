const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    id: {
        type: Number,
        require: true
    },
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