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

        /**
         * This is a method that, using the sequelize Employee model, should create and add
         * to the database, a new employee object/record.
         * @param {Object} body 
         * @returns {Employee} Response Object
         */
        async addEmployeeData(body) {
            const resData = await Employee.create(body)

            if (resData == null || resData == "undefined") {
                return //Error Handling
            }

            return resData.toJSON();
        }

        /**
         * This is a method that, using the sequelize Employee model, should get a specified
         * employee object determined by the employee id.
         * @param {Number} empid 
         * @returns {Employee} Response Object
         */
        async retreiveEmployeeData(empid) {
            const resData = await Employee.findAll({
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
         * This is a method that, using the sequelize Employee model, should get a list of
         * employee objects/records determined by the employee id.
         * @returns {Employee} Response Object
         */
        async retreiveEmployeeList() {
            const resData = await Employee.findAll()

            if (resData == null || resData == "undefined") {
                return //Error Handling
            }

            return resData;
        }

        /**
         * This is a method that, using the sequelize Employee model, should update a
         * specific employee object/record determined by the employee id.
         * @param {Number} empid 
         * @param {Object} body 
         * @returns {Employee} Response Object
         */
        async updateEmployeeData(empid, body) {
            const resData = await Employee.update(
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

    Employee.init({
        firstname: DataTypes.STRING,
        lastname: DataTypes.STRING,
        dob: DataTypes.STRING,
        doe: DataTypes.STRING,
        dot: DataTypes.STRING,
        employid: DataTypes.INTEGER,
        depid: DataTypes.INTEGER,
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