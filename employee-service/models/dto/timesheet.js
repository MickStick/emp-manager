'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TimeSheet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }

    /**
 * This is a method that, using the sequelize TimeSheet model, should create and add
 * to the database, a new timeSheets object/record.
 * @param {Object} body 
 * @returns {TimeSheet} Response Object
 */
    async addEmployeeData(body) {
      const resData = await TimeSheet.create(body)

      if (resData == null || resData == "undefined") {
        return //Error Handling
      }

      return resData.toJSON();
    }

    /**
     * This is a method that, using the sequelize TimeSheet model, should get a specified
     * timeSheets object determined by the timeSheets id.
     * @param {Number} empid 
     * @returns {TimeSheet} Response Object
     */
    async retreiveEmployeeData(empid) {
      const resData = await TimeSheet.findAll({
        where: {
          employid: empid
        }
      })

      if (resData == null || resData == "undefined") {
        return //Error Handling
      }

      return resData;
    }

    /**
     * This is a method that, using the sequelize TimeSheet model, should get a list of
     * timeSheets objects/records determined by the timeSheets id.
     * @returns {TimeSheet} Response Object
     */
    async retreiveEmployeeList() {
      const resData = await TimeSheet.findAll()

      if (resData == null || resData == "undefined") {
        return //Error Handling
      }

      return resData;
    }

    /**
     * This is a method that, using the sequelize TimeSheet model, should update a
     * specific timeSheets object/record determined by the timeSheets id.
     * @param {Number} empid 
     * @param {Object} body 
     * @returns {TimeSheet} Response Object
     */
    async updateEmployeeData(empid, body) {
      const resData = await TimeSheet.update(
        body,
        {
          where: {
            employid: empid
          }
        }
      )

      if (resData == null || resData == "undefined") {
        return //Error Handling
      }

      return resData;
    }
  }
  TimeSheet.init({
    tsid: DataTypes.STRING,
    assignee: DataTypes.INTEGER,
    body: DataTypes.STRING,
    startdate: DataTypes.DATE,
    enddate: DataTypes.DATE,
    createat: DataTypes.DATE,
    updateat: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'TimeSheet',
  });
  return TimeSheet;
};