const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../Models/user.model')

class AuthController {
    async register(req, res) {
        if (!req.body.name) {
            res.json({
                errorMessage: 'Bạn chưa nhập tên'
            })
        }
        if (!req.body.phone) {
            res.json({
                errorMessage: 'Bạn chưa nhập SĐT'
            })
        }
        if (!req.body.email) {
            res.json({
                errorMessage: 'Bạn chưa nhập Email'
            })
        }
        if (!req.body.password) {
            res.json({
                errorMessage: 'Bạn chưa nhập mật khẩu'
            })
        }
        if (!req.body.rule) {
            res.json({
                errorMessage: 'Bạn chưa chọn rule đăng nhập'
            })
        }

        const SALT_FACTOR = 8
        let hashPassword = await bcrypt.hash(req.body.password, SALT_FACTOR)

        try {
            const user = await User.create({
                name: req.body.name,
                phone: req.body.phone,
                email: req.body.email,
                account_number: req.body.account_number,
                password: hashPassword,
                rule: req.body.rule
            })
            res.json({
                user: user.dataValues
            })
        } catch (error) {
            res.json({
                errorMessage: 'Lỗi đăng ký'
            })
        }
    }

    async login(req, res) {
        try {
            const phone = req.body.phone
            const password = req.body.password

            if (!phone) {
                res.json({
                    errorMessage: 'Cần nhập Số điện thoại'
                })
            }

            if(!password) {
                res.json({
                    errorMessage: 'Cần nhập mật khẩu'
                })
            }

            const user = await User.findOne({
                where: {
                    phone: phone
                }
            })

            if (!user) {
                res.json({
                    errorMessage: 'Số điện thoại chưa được đăng ký'
                })
            }

            const isValidPassword = await bcrypt.compare(password, user.password)

            if (!isValidPassword) {
                res.json({
                    errorMessage: 'Mật khẩu không chính xác'
                })
            }

            const token = jwt.sign({
                user_id: user.id,
                phone: user.phone
            }, process.env.TOKEN_KEY, {
                expiresIn: '2h'
            })

            user.dataValues.token = token

            // console.log(user)
            res.json({
                message: 'Đăng nhập thành công',
                user_data: user
            })

        } catch (error) {
            res.json({
                errorMessage: 'Lỗi đăng nhập'
            })
        }
    }
}

module.exports = new AuthController