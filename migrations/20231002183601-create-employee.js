'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Employees', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstname: {
        type: Sequelize.STRING
      },
      lastname: {
        type: Sequelize.STRING
      },
      dob: {
        type: Sequelize.STRING
      },
      doe: {
        type: Sequelize.STRING
      },
      dot: {
        type: Sequelize.STRING
      },
      employid: {
        type: Sequelize.NUMBER
      },
      depid: {
        type: Sequelize.NUMBER
      },
      jobtitle: {
        type: Sequelize.NUMBER
      },
      accesslvl: {
        type: Sequelize.STRING
      },
      rate: {
        type: Sequelize.STRING
      },
      compensate: {
        type: Sequelize.NUMBER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Employees');
  }
};