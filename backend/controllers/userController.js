const UserModel = require('../models/UserModel')

const getUser = async (req, res) => {
    res.status(200).json({ message: "coll! _l_" })
}

const setUser = async (req, res) => {
    const { name } = req.body
    const score = req.cookies['trex-high-score'] || "0";

    try{
        const user = await UserModel.create({name,score})
        res.status(200).json({user})
    }catch(error){
        res.status(400).json({error: error.message})
    }

}

module.exports = {
    getUser,
    setUser
}