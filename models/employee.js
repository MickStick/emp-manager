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
    employid: DataTypes.INTEGER,
    depid:DataTypes.INTEGER,
    jobtitle: DataTypes.INTEGER,
    accesslvl: DataTypes.STRING,
    rate: DataTypes.STRING,
    compensate: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Employee',
  });
  return Employee;
};