const express = require('express')
const User = require('../Models/user.model')
const router = express.Router()

const userController = require('../Controllers/user.controller')

router.post('/update_avatar', userController.uploadImg, userController.updateAvatar)


module.exports = router