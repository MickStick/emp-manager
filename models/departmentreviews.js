'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DepartmentReviews extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  DepartmentReviews.init({
    depid: DataTypes.INTEGER,
    head: DataTypes.INTEGER,
    reviewer: DataTypes.INTEGER,
    review: DataTypes.STRING,
    period: DataTypes.STRING,
    rate: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'DepartmentReviews',
  });
  return DepartmentReviews;
};