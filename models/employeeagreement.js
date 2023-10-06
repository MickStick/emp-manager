'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class EmployeeAgreement extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  EmployeeAgreement.init({
    empid: DataTypes.INTEGER,
    document: DataTypes.STRING,
    summary: DataTypes.STRING,
    details: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'EmployeeAgreement',
  });
  return EmployeeAgreement;
};