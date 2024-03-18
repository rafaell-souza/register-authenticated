'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn('registrations','number', { 

        type: Sequelize.STRING(20),
        allowNull: false
     });
     
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn('registrations','number');
  
  }
};
  