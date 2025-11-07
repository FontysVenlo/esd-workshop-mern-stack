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
     /**
     * TODO: Create the logic to POST a user in MongoDB
     * @const {name} - should be recived from the request body
     * @const {score} - should be recived from the browser cookies
     * 
     * TODO-2: 
     * TODO-bonus: Sort the data
     */
    // const { name } = req.body
    // const score = req.cookies['trex-high-score'] || "0";
    // const io = req.app.get("socketio");
    // try {

    //     const user = await UserModel.findOne({ name });

    //     if (user) {
    //         user.score = score;
    //         await user.save();

    //         const list = await UserModel.find().sort({ score: -1 });
    //         io.emit("newPlayers", list);
    //         console.log(list)
    //         console.log("11")
    //         return res.status(200).json({ message: "User updated", user });
    //     }

    //     const newUser = await UserModel.create({ name, score })
    //     const list = await UserModel.find().sort({ score: -1 });
    //     io.emit("newPlayers", list);
    //     console.log(list)
    //     res.status(200).json({ message: "User created", newUser })


    // } catch (error) {
    //     res.status(400).json({ error: error.message })
    // }

}

module.exports = {
    getAllUser,
    setUser
}