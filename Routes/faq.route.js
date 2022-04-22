const express = require('express')
const router = express.Router()

const FAQController = require('../Controllers/faq.controller')
const authMiddleware = require('../Middleware/auth.middleware')

router.get('/get_list', FAQController.getList)
router.post('/add', authMiddleware, FAQController.addFAQ)
router.post('/delete', authMiddleware, FAQController.deleteFAQ)
router.post('/edit', authMiddleware, FAQController.editFAQ)

module.exports = router