const {EmployeeService} = require("../services");

module.exports = class EmployeeController{
    constructor(){
        this.empService = new EmployeeService()
    }

    async registerEmployee(req, res, next) {
        //Get body from req
        let { body } = req;

        //Sanitize the Employee
        // body = sanitize(body)

        //Validate fields
        let valErr = [];//vaidateCreateEmployee(body);

        if (valErr.length > 0) {
            let err = new Error(JSON.stringify(valErr))
            err.name = "Validation Error"
            return handle500Error(res, err, "Validation Error!");
        }

        try {
            Log.info("Attempting to create Employee object...")
            //body.empid = crypto.randomBytes(16).toString("hex");
            let employee = await Employee.createEmployee(body)
            return handle200Response(res, employee, "Employee has been successfully created!")
        } catch (err) {
            Log.error(err.message)
            return handleError(res, err, "Employee Creation Error!", { status: 400, state: "noEmployeecreate" });
        }
    }

    async updateEmployee(req, res, next) {
        let { id } = req.params;
        let { body } = req;

        //Sanitize the employee
        //TODO make a sanitize method for employee data
        // body = sanitize(body);

        //validate id
        let valErr = validateID(Number(id), null);

        //Validate fields
        valErr.push(...[]);//vaidateCreateEmployee(body);

        if (valErr.length > 0) {
            let err = new Error(JSON.stringify(valErr))
            err.name = "Validation Error"
            return handle500Error(res, err, "Validation Error!");
        }

        try {
            Log.info("Attempting to update employee with num " + String(id) + "...");
            let employee = await Employee.updateEmployee(Number(id), body);
            return handle200Response(res, employee, "Employee has been successfully updated!");

        } catch (err) {
            Log.error(err.message)
            return handleError(res, err, "Employee Update Error!", { status: 400, state: "noemployeeupdate" });
        }

    }

    async getEmployee(req, res, next) {
        let { id } = req.params;

        //validate id
        let valErr = validateID(Number(id), null);

        if (valErr.length > 0) {
            let err = new Error(JSON.stringify(valErr))
            err.name = "Validation Error"
            return handle500Error(res, err, "Validation Error!");
        }

        try {
            Log.info("Attempting to retrieve employee with num " + String(id) + "...");
            let employee = await Employee.getEmployee(Number(id));
            return handle200Response(res, employee, "Employee has been successfully retrieved!");

        } catch (err) {
            Log.error(err.message)
            return handleError(res, err, "Employee Retreival Error!", { status: 400, state: "noemployeeget" });
        }
    }

    async getEmployees(req, res, next) {
        //Get body from req
        let { body } = req;

        //Sanitize the employee
        //TODO make a sanitize method for employee data
        //  body = sanitize(body);

        //Validate fields
        let valErr = [];//vaidateCreateEmployee(body);

        if (valErr.length > 0) {
            let err = new Error(JSON.stringify(valErr))
            err.name = "Validation Error"
            return handle500Error(res, err, "Validation Error!");
        }

        try {
            Log.info("Attempting to retrieve employees... ");
            let employees = await Employee.getEmployeesByOptions(body);
            return handle200Response(res, employees, "Employees have been successfully retrieved!");
        } catch (err) {
            Log.error(err.message)
            return handleError(res, err, "Employees Retreival Error!", { status: 400, state: "noemployeeget" });
        }
    }

    async getEmployeeReview(req, res, next) {
        let { id } = req.params;

        //validate id
        let valErr = validateID(Number(id), null);

        if (valErr.length > 0) {
            let err = new Error(JSON.stringify(valErr))
            err.name = "Validation Error"
            return handle500Error(res, err, "Validation Error!");
        }

        try {
            Log.info("Attempting to retrieve employeeReview with num " + String(id) + "...");
            let employeeReview = await EmployeeReview.getEmployee(Number(id));
            return handle200Response(res, employeeReview, "Employee has been successfully retrieved!");

        } catch (err) {
            Log.error(err.message)
            return handleError(res, err, "Employee Retreival Error!", { status: 400, state: "noemployeeget" });
        }
    }

    async getEmployeeReviews(req, res, next) {
        //Get body from req
        let { body } = req;

        //Sanitize the employee
        //TODO make a sanitize method for employee data
        //  body = sanitize(body);

        //Validate fields
        let valErr = [];//vaidateCreateEmployee(body);

        if (valErr.length > 0) {
            let err = new Error(JSON.stringify(valErr))
            err.name = "Validation Error"
            return handle500Error(res, err, "Validation Error!");
        }

        try {
            Log.info("Attempting to retrieve employeeReviews... ");
            let employeeReviews = await EmployeeReview.getEmployeesByOptions(body);
            return handle200Response(res, employeeReviews, "Employee Reviews have been successfully retrieved!");
        } catch (err) {
            Log.error(err.message)
            return handleError(res, err, "Employees Retreival Error!", { status: 400, state: "noemployeeget" });
        }
    }

}