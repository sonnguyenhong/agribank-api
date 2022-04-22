const jwt = require('jsonwebtoken')
const express = require('express')

const router = express.Router()

const addressController = require('../Controllers/address.controller')

router.post('/add', addressController.addAddress)
router.put('/edit', addressController.editAddress)
router.post('/find', addressController.findAddress)

module.exports = router