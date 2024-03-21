'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn('registrations','password', { 

      type: Sequelize.STRING(70),
      allowNull: false
     });
    
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.changeColumn('registrations', 'password',{

      type: Sequelize.STRING(12),
      allowNull: false
     });

  }
};
