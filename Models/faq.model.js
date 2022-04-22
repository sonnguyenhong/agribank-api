const Sequelize = require('sequelize')

const sequelize = require('../Database/database')

const FAQCategory = require('./faqCategory.model')

const FAQ = sequelize.define('faq', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    question: {
        type: Sequelize.STRING,
        allowNull: false
    },
    answer: {
        type: Sequelize.STRING,
        allowNull: false
    },
    category: {
        type: Sequelize.ENUM("Đăng ký và đăng nhập", "Mật khẩu và bảo mật", "Thiết bị hỗ trợ và tải ứng dụng", "Câu hỏi khác"),
        allowNull: false,
        defaultValue: "Câu hỏi khác",
        validate: {
            isIn: {
                args: [
                    ["Đăng ký và đăng nhập", "Mật khẩu và bảo mật", "Thiết bị hỗ trợ và tải ứng dụng", "Câu hỏi khác"]
                ],
                msg: "Loại câu hỏi không chính xác"
            }
        }
    }
})

// Question.belongsTo(QuestionCategory)

module.exports = FAQ