'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('registrations','permission', { 

        type: Sequelize.ENUM('standard', 'premium'),
        allowNull: false,
        defaultValue: 'standard'
      
     });

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('registrations', 'permission');
     
  }
};
