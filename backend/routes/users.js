const express = require('express')

const router = express.Router()

const { getAllUser, setUser } = require("../controllers/userController")

router.get('/get-user-all', getAllUser)

router.post('/set-user', setUser)

module.exports = router
