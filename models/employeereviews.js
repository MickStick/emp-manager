'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class EmployeeReviews extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  EmployeeReviews.init({
    empid: DataTypes.INTEGER,
    reviewer: DataTypes.INTEGER,
    review: DataTypes.STRING,
    period: DataTypes.STRING,
    rate: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'EmployeeReviews',
  });
  return EmployeeReviews;
};