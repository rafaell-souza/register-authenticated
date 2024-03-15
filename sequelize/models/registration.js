const Sequelize = require('sequelize')
const db = require('../config/config')

const registration = db.define('registration', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING(40),
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING(250),
        unique: true,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING(12),
        allowNull: false
    },
    number: {
        type: Sequelize.STRING(10),
        allowNull: false
    }
},
{timestamps: false})


module.exports = registration