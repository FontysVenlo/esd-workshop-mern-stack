const UserModel = require('../models/UserModel')

const getAllUser = async (req, res) => {
    /**
     * TODO: Create the logic to GET all users from MongoDB
     * TODO-1: Send back the data to the client with a successful HTTP status (200)
     * TODO-2: Handles any database or query error and responds with status 400 plus the error message.
     * TODO-bonus: Sort the data
     */
    // try {
    //     const users = await UserModel.find().sort({ score: -1 });
    //     res.status(200).json({ users })
    // } catch (error) {
    //     res.status(400).json({ error: error.message })
    // }
}

const setUser = async (req, res) => {
    const io = req.app.get("socketio");
    /**
    * TODO: Create the logic to POST a user in MongoDB
    * TODO: After the POST pass the full list of users and scores to the websocket
    * @const {name} - should be recived from the request body
    * @const {score} - should be recived from the browser cookies
    */

    // const { name } = req.body;
    // const score = req.cookies['trex-high-score'] || "0";

    // try {
    //     let user = await UserModel.findOne({ name });

    //     if (user) {
    //         user.score = score;
    //         await user.save();
    //     } else {
    //         user = await UserModel.create({ name, score });
    //     }

    //     const list = await UserModel.find().sort({ score: -1 }).lean();

    //     const message = user && user._id ? (user.createdAt === user.updatedAt ? "User created" : "User updated") : "User saved";
    //     return res.status(200).json({ message, user });
    // } catch (error) {
    //     return res.status(400).json({ error: error.message });
    // }


    io.emit("newPlayers", list);

}

module.exports = {
    getAllUser,
    setUser
}