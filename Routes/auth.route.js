const { response } = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const express = require('express')
const User = require('../Models/user.model')
const router = express.Router()

const authController = require('../Controllers/auth.controller')

router.post('/register', authController.register)

router.post('/login', authController.login)


module.exports = router