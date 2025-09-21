const express = require('express')

const router = express.Router()   

const {getUser,setUser} = require("../controllers/userController")

router.get('/get-user', getUser)

router.post('/set-user', setUser)

module.exports = router
