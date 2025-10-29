const UserModel = require('../models/UserModel')

const getAllUser = async (req, res) => {
    try {
        const users = await UserModel.find().sort({ score: -1 });
        res.status(200).json({ users })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const setUser = async (req, res) => {
    const { name } = req.body
    const score = req.cookies['trex-high-score'] || "0";
    const io = req.app.get("socketio");
    console.log("1")
    try {

        const user = await UserModel.findOne({ name });

        if (user) {
            user.score = score;
            await user.save();

            // io.emit("newPlayers", user)
            const list = await UserModel.find().sort({ score: -1 });
            io.emit("newPlayers", list);
            console.log(list)
            console.log("11")
            return res.status(200).json({ message: "User updated", user });
        }
            console.log("122")

        const newUser = await UserModel.create({ name, score })
        const list = await UserModel.find().sort({ score: -1 });
        io.emit("newPlayers", list);
        console.log(list)
        res.status(200).json({ message: "User created", newUser })


    } catch (error) {
        res.status(400).json({ error: error.message })
    }

}

module.exports = {
    getAllUser,
    setUser
}