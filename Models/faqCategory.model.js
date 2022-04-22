const Sequelize = require('sequelize')

const sequelize = require('../Database/database')
const FAQ = require('./faq.model')

const FAQCategory = sequelize.define('faqCategory', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    category: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

module.exports = FAQCategory