const Employee = require("../models/employee")
const EmployeeReview = require("../models/employeereviews")

module.exports = class EmployeeService {

    constructor() {

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

        return resData;
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

    /**
     * This is a method that, using the sequelize Department model, should create and add
     * to the database, a new employee review object/record. 
     * @param {Object} body 
     * @returns {EmployeeReview} Response Object
     */
    async addEmployeeReview(body) {
        const resData = await EmployeeReview.create(body)

        if (resData == null || resData == "undefined") {
            return //Error Handling
        }

        return resData;
    }

    /**
     * This is a method that, using the sequelize EmployeeReview model, should get a specified
     * employee review object/record determined by the employee id. 
     * @param {Number} empid 
     * @returns {EmployeeReview} Response Object
     */
    async retreiveEmployeeReview(empid) {
        const resData = await EmployeeReview.findAll({
            where: {
                empid: empid
            }
        })

        if (resData == null || resData == "undefined") {
            return //Error Handling
        }

        return resData[0];
    }

    /**
     * This is a method that, using the sequelize EmployeeReview model, should get a list of
     * employee review objects/records determined by the employee id. 
     * @returns {EmployeeReview} Response Object
     */
    async retreiveEmployeeReviewList(empid) {
        const resData = await EmployeeReview.findAll({
            where: {
                empid: empid
            }
        })

        if(resData == null || resData == "undefined"){
            return //Error Handling
        }

        return resData;
    }

     /**
     * This is a method that, using the sequelize EmployeeReview model, should update a
     * specific employee review object/record determined by the review id.
     * @param {Number} revid 
     * @param {Object} body 
     * @returns {EmployeeReview} Response Object
     */
    async updateEmployeeReview(body) {
        const resData = await EmployeeReview.update(
            body,
           { 
            where: {
                id: revid
            }
           }
        )

        if(resData == null || resData == "undefined"){
            return //Error Handling
        }

        return resData;
    }



}