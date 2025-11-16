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

    const { name } = req.body;
    const score = req.cookies['trex-high-score'] || "0";

    try {
        let user = await UserModel.findOne({ name });

        if (user) {
            user.score = score;
            await user.save();
        } else {
            user = await UserModel.create({ name, score });
        }

        const message = user && user._id ? (user.createdAt === user.updatedAt ? "User created" : "User updated") : "User saved";
        return res.status(200).json({ message, user });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }

}

module.exports = {
    getAllUser,
    setUser
}