'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Department extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }

      /**
   * This is a method that, using the sequelize Department model, should create and add
   * to the database, a new department object/record.
   * @param {Object} body 
   * @returns {Department} Response Object
   */
      async addDepartmentData(body) {
        const resData = await Department.create(body)

        if (resData == null || resData == "undefined") {
            return //Error Handling
        }

        return resData.toJSON();
    }

    /**
     * This is a method that, using the sequelize Department model, should get a specified
     * department object determined by the department id.
     * @param {Number} empid 
     * @returns {Department} Response Object
     */
    async retreiveDepartmentData(empid) {
        const resData = await Department.findAll({
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
     * This is a method that, using the sequelize Department model, should get a list of
     * department objects/records determined by the department id.
     * @returns {Department} Response Object
     */
    async retreiveDepartmentList() {
        const resData = await Department.findAll()

        if (resData == null || resData == "undefined") {
            return //Error Handling
        }

        return resData;
    }

    /**
     * This is a method that, using the sequelize Department model, should update a
     * specific department object/record determined by the department id.
     * @param {Number} empid 
     * @param {Object} body 
     * @returns {Department} Response Object
     */
    async updateDepartmentData(empid, body) {
        const resData = await Department.update(
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
  Department.init({
    name: DataTypes.STRING,
    slug: DataTypes.STRING,
    head: DataTypes.INTEGER,
    depcode: DataTypes.STRING,
    doe: DataTypes.STRING,
    state: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Department',
  });
  return Department;
};