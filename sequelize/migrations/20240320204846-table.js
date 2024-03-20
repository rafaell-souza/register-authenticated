'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('registrations', { 
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
        type: Sequelize.STRING(20),
        allowNull: false
    }
    
},  {timestamps: false}
     );

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('registrations');
    
  }
};
