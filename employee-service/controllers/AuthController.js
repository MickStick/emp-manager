//TODO
/**
 * Will controll all authenticationa and authorization methods
 * Will use Employee model
 */

const Employee = require('../models/dto');
const { Log, Validator, RestResponse } = require('../../utility');
const { handleError, handle500Error, handle404Error, handle200Response } = require('../../utility/Functions')
const NodeCache = require('node-cache');
const cache = new NodeCache();

module.exports = class AuthController {
    /**
    * This method is used to authenticate an Employee using their password
    * @param {Request} req 
    * @param {Response} res 
    * @returns {Response} - Response to the client
    */
    static async auth(req, res) {
        //Allow employees to be authenticated into the system
        let { body } = req;

        body = Validator.sanitize(body);

        let valErr = Validator.validateEmployeeLogin(body)

        if (valErr.length > 0) {
            let err = new Error(JSON.stringify(valErr))
            return this.handle500Error(res, err, "Validation Error!");
        }

        try {
            Log.info("Attempting to authenticate user...")
            let { emp, token } = await Employee.authenticate(body)
            res.cookie('auth-token', token, { httpOnly: true });
            return this.handle200Response(res, emp, "You have been successflly authenticated!")

        } catch (err) {
            Log.error(err.message)
            return this.handleError(res, err, "Authentication Error!", { status: 401, state: "noauth" });
        }

    }

    /**
 * This method is used to register a new Employee's password
 * @param {Request} req 
 * @param {Response} res 
 * @returns {Response} - Response to the client
 */
    static async register(req, res) {
        let { empid, password } = req.body;

        let valErr = Validator.validateEmployeeLogin({ empid, password })

        if (valErr.length > 0) {
            let err = new Error(JSON.stringify(valErr))
            return this.handle500Error(res, err, "Validation Error!");
        }

        try {
            let emp = await Employee.register(empid, password);

            return this.handle200Response(res, emp, "The Employee password has been registered sucessfully!")

        } catch (err) {
            Log.error(err.message)
            return this.handleError(res, err, "Cannot Register Employee Password!", { status: 400, state: "noreg" });
        }
    }

    /**
     * This method is used to reset an Employee's password
     * @param {Request} req 
     * @param {Response} res 
     * @returns {Response} - Response to the client
     */
    static async resetPassword(req, res) {
        let { empid, oldPassword, password } = req.body;

        let valErr = Validator.validateEmployeeLogin({ empid, password })
        valErr.push(...Validator.validatePassword(oldPassword))

        if (valErr.length > 0) {
            let err = new Error(JSON.stringify(valErr))
            return this.handle500Error(res, err, "Validation Error!");
        }

        try {
            let emp = await Employee.resetPassword(empid, oldPassword, password);

            return this.handle200Response(res, emp, "Your password has been successfully updated!")

        } catch (err) {
            Log.error(err.message)
            return this.handleError(res, err, "Cannot Reset Password!", {status: 400, state: "noreset"});
        }
    }

    /**
     * This is method will be responsible for triggerign the forget password processs.
     * @param {Request} req 
     * @param {Response} res 
     * @returns {Response} - Response to the client
     */
    static async forgetPassword(req, res){}
}