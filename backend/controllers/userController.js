const UserModel = require('../models/UserModel')

const getUser = async (req, res) => {
    res.status(200).json({ message: "coll!" })
}

const setUser = async (req, res) => {
    const { name } = req.body
    const score = req.cookies['trex-high-score'] || "0";

    try {

        const user = await UserModel.findOne({ name });

        if (user) {
            user.score = score;
            await user.save();
            return res.status(200).json({ message: "User updated", user });
        }

        const newUser = await UserModel.create({ name, score })
        res.status(200).json({ message: "User created", newUser })

    } catch (error) {
        res.status(400).json({ error: error.message })
    }

}

module.exports = {
    getUser,
    setUser
}