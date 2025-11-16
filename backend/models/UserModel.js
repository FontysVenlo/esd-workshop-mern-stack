const mongoose = require('mongoose')


/** 
    * TODO: Create a constant that contains the DB schema
    * @property  {string} name - Player name 
    * @property  {number} score - Player score
    * @property  {timestamps} - timestamps of the creation
*/

 // === USER SCHEMA CODE ===
 

const Users = mongoose.model('users', userSchema);
module.exports = Users