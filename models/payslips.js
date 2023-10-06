'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Payslips extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Payslips.init({
    empid: DataTypes.INTEGER,
    amount: DataTypes.NUMBER,
    date: DataTypes.STRING,
    withheld: DataTypes.NUMBER,
    account: DataTypes.NUMBER
  }, {
    sequelize,
    modelName: 'Payslips',
  });
  return Payslips;
};