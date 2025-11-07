const mongoose = require('mongoose')


/** 
    * TODO: Create a constant that contains the DB schema
    * @property  {string} name - Player name 
    * @property  {number} score - Player score
    * @property  {timestamps} - timestamps of the creation
*/

// const userSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: true,
//     },
//     score: {
//         type: Number,
//         required: true
//     }
// }, { timestamps: true })


const Users = mongoose.model('users', userSchema);
module.exports = Users