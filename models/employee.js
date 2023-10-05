'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Employee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Employee.init({
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    dob: DataTypes.STRING,
    doe: DataTypes.STRING,
    dot: DataTypes.STRING,
    employid: DataTypes.NUMBER,
    depid:DataTypes.NUMBER,
    jobtitle: DataTypes.NUMBER,
    accesslvl: DataTypes.STRING,
    rate: DataTypes.STRING,
    compensate: DataTypes.NUMBER
  }, {
    sequelize,
    modelName: 'Employee',
  });
  return Employee;
};