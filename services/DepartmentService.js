const Department = require("../models/department")
const DepartmentReview = require("../models/departmentreviews")
const EmployeeService = require("./EmployeeService")

module.exports = class DepartmentService {

    constructor(){
        this.empService = new EmployeeService()
    }

    /**
     * This is a method that, using the sequwlize Department model, should create and add
     * to the database, a new department object/record.
     * @param {Object} body 
     * @returns {Department} Response Data
     */
    async addDepartmentData(body){
        const resData = await Department.create(body)

        if(resData == null || resData == "undefined"){
            return //Error Handling
        }

        return resData;

    }

    /**
     * This is a method that, using the sequwlize Department model, should get a specified
     * department object determined by the department id.
     * @param {Number} depid 
     * @returns {Department} Response Data
     */
    async retreiveDepartmentData(depid){
        const resData = await Department.findAll({
            where: {
                depid:depid
            }
        })

        if(resData == null || resData == "undefined"){
            return //Error Handling
        }

        return resData;
    }

    async retreiveDepartmentList(){
        const resData = await Department.findAll()

        if(resData == null || resData == "undefined"){
            return //Error Handling
        }

        return resData;
    }

    async updateDepartmentData(depid, body){
        const resData = await Department.update(
            body,
           { 
            where: {
                depid:depid
            }
           }
        )
    }

    async addDepartmentReview(body){

    }

    async retreiveDepartmentHead(depid){

    }

    async retreiveDepartmentReview(depid){

    }

    async retreiveDepartmentReviews(depid){
        
    }

    async updateDepartmentReview(body){
        
    }
    
}