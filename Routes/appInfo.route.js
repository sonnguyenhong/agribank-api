const express = require('express')
const router = express.Router()

const appInfoController = require('../Controllers/appInfo.controller')

router.get('/', appInfoController.getInfo)

module.exports = router