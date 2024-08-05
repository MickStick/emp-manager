// const { DepartmentService } = require("../services");
const Department = require('../models/dto');
const { Log, Validator, RestResponse } = require('../../utility');
const { sanitize, validateID } = Validator;
const { handleError, handle500Error, handle404Error, handle200Response } = require('../../utility/Functions')
const NodeCache = require('node-cache');
const cache = new NodeCache();

module.exports = class DepartmentController {

    constructor() {
        this.depService = new DepartmentService()
    }

    async registerDepartment(req, res, next) {
        //Get body from req
        let { body } = req;

        //Sanitize the Department
        // body = sanitize(body)

        //Validate fields
        let valErr = [];//vaidateCreateDepartment(body);

        if (valErr.length > 0) {
            let err = new Error(JSON.stringify(valErr))
            err.name = "Validation Error"
            return handle500Error(res, err, "Validation Error!");
        }

        try {
            Log.info("Attempting to create Department object...")
            //body.Departmentid = crypto.randomBytes(16).toString("hex");
            let department = await Department.createDepartment(body)
            return handle200Response(res, department, "Department has been successfully created!")
        } catch (err) {
            Log.error(err.message)
            return handleError(res, err, "Department Creation Error!", { status: 400, state: "noDepartmentcreate" });
        }
    }

    async updateDepartment(req, res, next) {
        let { id } = req.params;
        let { body } = req;

        //Sanitize the department
        //TODO make a sanitize method for department data
        // body = sanitize(body);

        //validate id
        let valErr = validateID(Number(id), null);

        //Validate fields
        valErr.push(...[]);//vaidateCreateDepartment(body);

        if (valErr.length > 0) {
            let err = new Error(JSON.stringify(valErr))
            err.name = "Validation Error"
            return handle500Error(res, err, "Validation Error!");
        }

        try {
            Log.info("Attempting to update department with num " + String(id) + "...");
            let department = await Department.updateDepartment(Number(id), body);
            return handle200Response(res, department, "Department has been successfully updated!");

        } catch (err) {
            Log.error(err.message)
            return handleError(res, err, "Department Update Error!", { status: 400, state: "nodepartmentupdate" });
        }

    }

    async getDepartment(req, res, next) {
        let { id } = req.params;

        //validate id
        let valErr = validateID(Number(id), null);

        if (valErr.length > 0) {
            let err = new Error(JSON.stringify(valErr))
            err.name = "Validation Error"
            return handle500Error(res, err, "Validation Error!");
        }

        try {
            Log.info("Attempting to retrieve department with num " + String(id) + "...");
            let department = await Department.getDepartment(Number(id));
            return handle200Response(res, department, "Department has been successfully retrieved!");

        } catch (err) {
            Log.error(err.message)
            return handleError(res, err, "Department Retreival Error!", { status: 400, state: "nodepartmentget" });
        }
    }

    async getDepartments(req, res, next) {
        //Get body from req
        let { body } = req;

        //Sanitize the department
        //TODO make a sanitize method for department data
        //  body = sanitize(body);

        //Validate fields
        let valErr = [];//vaidateCreateDepartment(body);

        if (valErr.length > 0) {
            let err = new Error(JSON.stringify(valErr))
            err.name = "Validation Error"
            return handle500Error(res, err, "Validation Error!");
        }

        try {
            Log.info("Attempting to retrieve departments... ");
            let departments = await Department.getDepartmentsByOptions(body);
            return handle200Response(res, departments, "Departments have been successfully retrieved!");
        } catch (err) {
            Log.error(err.message)
            return handleError(res, err, "Departments Retreival Error!", { status: 400, state: "nodepartmentget" });
        }
    }

    async getDepartmentReview(req, res, next) {
        let { id } = req.params;

        //validate id
        let valErr = validateID(Number(id), null);

        if (valErr.length > 0) {
            let err = new Error(JSON.stringify(valErr))
            err.name = "Validation Error"
            return handle500Error(res, err, "Validation Error!");
        }

        try {
            Log.info("Attempting to retrieve department with num " + String(id) + "...");
            let departmentReview = await DepartmentReview.getDepartment(Number(id));
            return handle200Response(res, departmentReview, "Department has been successfully retrieved!");

        } catch (err) {
            Log.error(err.message)
            return handleError(res, err, "Department Retreival Error!", { status: 400, state: "nodepartmentget" });
        }
    }

    async getDepartmentReviews(req, res, next) {
        //Get body from req
        let { body } = req;

        //Sanitize the department
        //TODO make a sanitize method for department data
        //  body = sanitize(body);

        //Validate fields
        let valErr = [];//vaidateCreateDepartment(body);

        if (valErr.length > 0) {
            let err = new Error(JSON.stringify(valErr))
            err.name = "Validation Error"
            return handle500Error(res, err, "Validation Error!");
        }

        try {
            Log.info("Attempting to retrieve departments... ");
            let departmentReviews = await DepartmentReview.getDepartmentsByOptions(body);
            return handle200Response(res, departmentReviews, "Department Reviews have been successfully retrieved!");
        } catch (err) {
            Log.error(err.message)
            return handleError(res, err, "Departments Retreival Error!", { status: 400, state: "nodepartmentget" });
        }
    }
}