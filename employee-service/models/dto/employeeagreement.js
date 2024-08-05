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

      /**
   * This is a method that, using the sequelize EmployeeAgreement model, should create and add
   * to the database, a new employeeAgreement object/record.
   * @param {Object} body 
   * @returns {EmployeeAgreement} Response Object
   */
      async addEmployeeAgreementData(body) {
        const resData = await EmployeeAgreement.create(body)

        if (resData == null || resData == "undefined") {
            return //Error Handling
        }

        return resData.toJSON();
    }

    /**
     * This is a method that, using the sequelize EmployeeAgreement model, should get a specified
     * employeeAgreement object determined by the employeeAgreement id.
     * @param {Number} empid 
     * @returns {EmployeeAgreement} Response Object
     */
    async retreiveEmployeeAgreementData(empid) {
        const resData = await EmployeeAgreement.findAll({
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
     * This is a method that, using the sequelize EmployeeAgreement model, should get a list of
     * employeeAgreement objects/records determined by the employeeAgreement id.
     * @returns {EmployeeAgreement} Response Object
     */
    async retreiveEmployeeList() {
        const resData = await EmployeeAgreement.findAll()

        if (resData == null || resData == "undefined") {
            return //Error Handling
        }

        return resData;
    }

    /**
     * This is a method that, using the sequelize EmployeeAgreement model, should update a
     * specific employeeAgreement object/record determined by the employeeAgreement id.
     * @param {Number} empid 
     * @param {Object} body 
     * @returns {EmployeeAgreement} Response Object
     */
    async updateEmployeeAgreementData(empid, body) {
        const resData = await EmployeeAgreement.update(
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