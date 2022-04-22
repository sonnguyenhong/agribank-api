const Sequelize = require('sequelize')

const sequelize = require('../Database/database')

const AppInfo = sequelize.define('appInfo', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    developers: {
        type: Sequelize.STRING,
        allowNull: false
    },
    category: {
        type: Sequelize.STRING,
        allowNull: false
    },
    version: {
        type: Sequelize.STRING,
        allowNull: false
    },
    capacity: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

module.exports = AppInfo