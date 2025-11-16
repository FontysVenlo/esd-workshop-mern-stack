const express = require('express')
const router = express.Router()

const { getAllUser, setUser } = require("../controllers/userController")

router.get('/get-user-all', getAllUser)

router.post('/post-user', setUser)

module.exports = router
