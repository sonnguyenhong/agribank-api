const express = require('express')
const router = express.Router()

const currencyController = require('../Controllers/currency.controller')

router.get('/get_list', currencyController.getList)

module.exports = router