const { response } = require('express')
const express = require('express')
const FAQ = require('../Models/faq.model')
const FAQCategory = require('../Models/faqCategory.model')
class FAQController {

    async getList(req, res) {
        try {
            const faqs = await FAQ.findAll()
            res.json({
                message: 'Lấy dữ liệu thành công',
                data: faqs
            })
        } catch (error) {
            res.json({
                errorMessage: 'Lấy dữ liệu không thành công'
            })
        }
    }

    async addFAQ(req, res) {
        if (!req.body.question) {
            res.json({
                errorMessage: 'Bạn chưa nhập câu hỏi'
            })
        }

        if (!req.body.answer) {
            res.json({
                errorMessage: 'Bạn chưa nhập câu trả lời'
            })
        }

        if (!req.body.category) {
            res.json({
                errorMessage: 'Bạn chưa chọn loại câu hỏi'
            })
        }
        try {
            const faq = await FAQ.create({
                question: req.body.question,
                answer: req.body.answer,
                category: req.body.category
            })

            res.json({
                message: 'Tạo câu hỏi thành công',
                data: faq
            })
        } catch (error) {
            res.json({
                errorMessage: 'Không thể thêm câu hỏi'
            })
        }
    }

    async deleteFAQ(req, res) {
        if (!req.body.id_faq) {
            res.json({
                errorMessage: 'Bạn chưa chọn câu hỏi cần xóa'
            })
        }

        try {
            await FAQ.destroy({
                where: {
                    id: req.body.id_faq
                }
            })

            res.json({
                message: 'Xóa câu hỏi thành công'
            })
        } catch (error) {
            res.json({
                message: 'Xóa câu hỏi thất bại'
            })
        }
    }

    async editFAQ(req, res) {
        if (!req.body.id_faq) {
            res.json({
                errorMessage: 'Chưa xác định câu hỏi cần sửa'
            })
        }

        if (!req.body.question) {
            res.json({
                errorMessage: 'Bạn chưa nhập câu hỏi'
            })
        }

        if (!req.body.answer) {
            res.json({
                errorMessage: 'Bạn chưa nhập câu trả lời'
            })
        }

        if (!req.body.category) {
            res.json({
                errorMessage: 'Bạn chưa chọn loại câu hỏi'
            })
        }

        try {
            const faq = await FAQ.update({
                question: req.body.question,
                answer: req.body.answer,
                category: req.body.category
            }, {
                where: {
                    id: req.body.id_faq
                }
            })

            res.json({
                message: 'Sửa câu hỏi thành công',
                data: {
                    id: req.body.id_faq,
                    question: req.body.question,
                    answer: req.body.answer,
                    category: req.body.category
                }
            })
        } catch (error) {
            res.json({
                errorMessage: 'Sửa câu hỏi không thành công'
            })
        }
    }

}

module.exports = new FAQController