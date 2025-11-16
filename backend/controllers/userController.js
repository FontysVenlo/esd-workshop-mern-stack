const UserModel = require('../models/UserModel')

const getAllUser = async (req, res) => {
    /**
     * TODO: Create the logic to GET all users from MongoDB
     * TODO-1: Send back the data to the client with a successful HTTP status (200)
     * TODO-2: Handles any database or query error and responds with status 400 plus the error message.
     * TODO-bonus: Sort the data
     */

    // === TRY...CATCH CODE ===
    

}

const setUser = async (req, res) => {
    /**
    * TODO: Create the logic to POST a user in MongoDB
    * @const {name} - should be recived from the request body
    * @const {score} - should be recived from the browser cookies
    */
    // === TRY...CATCH CODE ===
  

}

module.exports = {
    getAllUser,
    setUser
}