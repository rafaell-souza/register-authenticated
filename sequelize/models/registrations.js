import Sequelize from 'sequelize'
import connection from '../../database/connection.js'

const registrations = connection.define('registrations', {
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
        type: Sequelize.STRING(70),
        allowNull: false
    },
    number: {
        type: Sequelize.STRING(20),
        allowNull: false
    }
    
},  {timestamps: false}
)

export default registrations