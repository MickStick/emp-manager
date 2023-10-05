const Department = require("../models/department")
const DepartmentReview = require("../models/departmentreviews")
const EmployeeService = require("./EmployeeService")

module.exports = class DepartmentService {

    constructor(){
        this.empService = new EmployeeService()
    }

    /**
     * This is a method that, using the sequelize Department model, should create and add
     * to the database, a new department object/record.
     * @param {Object} body 
     * @returns {Department} Response Object
     */
    async addDepartmentData(body){
        const resData = await Department.create(body)

        if(resData == null || resData == "undefined"){
            return //Error Handling
        }

        return resData;

    }

    /**
     * This is a method that, using the sequelize Department model, should get a specified
     * department object determined by the department code.
     * @param {Number} depcode 
     * @returns {Department} Response Object
     */
    async retreiveDepartmentData(depcode){
        const resData = await Department.findAll({
            where: {
                depcode:depcode
            }
        })

        if(resData == null || resData == "undefined"){
            return //Error Handling
        }

        return resData;
    }

    /**
     * This is a method that, using the sequelize Department model, should get a list of
     * department objects/records determined by the department code.
     * @returns {Department} Response Object
     */
    async retreiveDepartmentList(){
        const resData = await Department.findAll()

        if(resData == null || resData == "undefined"){
            return //Error Handling
        }

        return resData;
    }

    /**
     * This is a method that, using the sequelize Department model, should update a
     * specific department object/record determined by the department code.
     * @param {Number} depcode 
     * @param {Object} body 
     * @returns {Department} Response Object
     */
    async updateDepartmentData(depcode, body){
        const resData = await Department.update(
            body,
           { 
            where: {
                depcode:depcode
            }
           }
        )

        if(resData == null || resData == "undefined"){
            return //Error Handling
        }

        return resData;
    }

    /**
     * This is a method that, using the sequelize Department model, should create and add
     * to the database, a new department review object/record. 
     * @param {Object} body 
     * @returns {DepartmentReview} Response Object
     */
    async addDepartmentReview(body){
        const resData = await DepartmentReview.create(body);

        if(resData == null || resData == "undefined"){
            return //Error Handling
        }

        return resData;
    }

    /**
     * This is a method that, using the sequelize Department model, should get a specified
     * department object determined by the department code then retreive and return the 
     * head of such department.
     * @param {Number} depcode 
     * @returns {Employee} Response Object
     */
    async retreiveDepartmentHead(depcode){

        const resData = await Department.findAll({
            where: {
                depcode:depcode
            }
        })

        if(resData == null || resData == "undefined"){
            return //Error Handling
        }

        const empData = await this.empService.retreiveEmployeeData(resData.empid);

        if(empData == null || empData == "undefined"){
            return //Error Handling
        }

        return empData;
    }

    /**
     * This is a method that, using the sequelize DepartmentReview model, should get a specified
     * department review object/record determined by the department code. 
     * @param {Number} depcode 
     * @returns {DepartmentReview} Response Object
     */
    async retreiveDepartmentReview(depcode){
        const resData = await DepartmentReview.findAll({
            where: {
                depcode: depcode
            }
        })

        if(resData == null || resData == "undefined"){
            return //Error Handling
        }

        return resData[0];
    }

     /**
     * This is a method that, using the sequelize DepartmentReview model, should get a list of
     * department review objects/records determined by the department code. 
     * @returns {DepartmentReview} Response Object
     */
    async retreiveDepartmentReviewList(depcode){
        const resData = await DepartmentReview.findAll({
            where: {
                depcode: depcode
            }
        })

        if(resData == null || resData == "undefined"){
            return //Error Handling
        }

        return resData;
    }

    /**
     * This is a method that, using the sequelize DepartmentReview model, should update a
     * specific department review object/record determined by the review id.
     * @param {Number} revid 
     * @param {Object} body 
     * @returns {DepartmentReview} Response Object
     */
    async updateDepartmentReview(revid, body){
        const resData = await DepartmentReview.update(
            body,
           { 
            where: {
                _id: revid
            }
           }
        )

        if(resData == null || resData == "undefined"){
            return //Error Handling
        }

        return resData;
    }
    
}