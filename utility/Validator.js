import escapeHtml from 'escape-html';
import {Log} from './';
import { IEmployee } from '../models/Employees';
//Regex classifications
let nameReg = /^[a-zA-Z ]$/;
let unameReg = /^[a-z0-9_-]$/;
let passRegex = /^[A-Za-z0-9!@#$%&]*$/; ///[a-zA-Z0-9!@#$&]/;
let strReg = /^[a-zA-Z0-9 ]$/;
let numReg = /^\d/;
let dateReg = /^\d{4}-\d{2}-\d{2}$/;

export class Validator {



    /**
     * Check if a date string is in the future
     * @param {Date} date - Date string to check
     * @returns {Boolean} - whether it's a future date or not
     */
    static isFutureDate(date) {
        let now = new Date();

        return date > now;
    }

    //Sanitize the data
    /**
     * This accepts a JSON object containing request data to be sanitized
     * @param {*} obj
     * @returns {Object} object
     */
    static sanitize(obj) {
        Log.info("Sanitizing Request Object");
        for (let k of Object.keys(obj)) {
            if (typeof  obj[k] == "string") {
                obj[k] = escapeHtml(obj[k])
            }else if(Array.isArray(obj[k])){
                
            }
        }
        Log.info("Sanitized Request Object!");

        return obj;
    }

    //TODO make a sanitize method for invoice data
    /**
     * This accepts a JSON object containing invoice data to be sanitized
     * @param {*} obj
     * @returns {Object} objext
     */
    static sanitizeInvoice(obj) { return obj }

    /**
     * This is a method responsible for validating a name string.  
     * It tests against the regullar expression /[a-zA-Z ]/
     * @param {String} name - The name to be validated
     * @param {any} opts - Additional options for validation specifications
     * @returns {Array<String>} errList - Array of error messages. Empty if no errors
     */
    static validateNameField(name, opts) {
        let errList = new Array();
        //validate name
        //regex `/^[a-zA-Z ]/`, check for only alphabet and spaces
        //should be more than 2 characters
        let fieldRegEx = (opts?.regex || nameReg);

        if (name instanceof String) {
            if (!fieldRegEx.test(name)) {
                errList.push(`Invalid ${opts.fieldName || "Name"}! ${opts.msg || "Only aplhabetical characters and spaces accepted"}!`)
            }
            if (name.length < (opts?.len || 2)) {
                errList.push(`Invalid ${opts.fieldName || "Name"}! ${opts.fieldName || "Names"} should be more than ${(opts.len || 2)} character!`)
            }
        } else {
            errList.push(`Invalid ${opts.fieldName || "Name"}! ${opts.fieldName || "Names"} should be a string!`)
        }

        return errList;

    }

    /**
    * This is a method responsible for validating a text string.  
    * It tests against the regullar expression /[a-zA-Z0-9 ]/
    * @param {String} text - The text to be validated
    * @param {any} opts - Additional options for validation specifications
    * @returns {Array<String>} errList - Array of error messages. Empty if no errors
    */
    static validateTextField(text, opts) {
        let errList = new Array()
        //validate text
        //regex `/^[a-zA-Z]/`, check for only alphanumeric and spaces
        //should be more than 1 characters
        let fieldRegEx = (opts?.regex || strReg);

        if (typeof text == "string") {
            if (!fieldRegEx.test(text)) {
                errList.push(`Invalid ${opts.fieldName || "Field"}! ${opts.msg || "Only aplhanumerical characters and spaces accepted"}!`)
            }
            if (text.length < (opts?.len || 1)) {
                errList.push(`Invalid ${opts.fieldName || "Field"}! ${opts.fieldName || "Fields"} should be more than ${(opts?.len || 1)} character!`)
            }
        } else {
            errList.push(`Invalid ${opts.fieldName || "Field"}! ${opts.fieldName || "Fields"} should be a string!`)
        }

        return errList;

    }

    /**
     * This is a method responsible for validating an id number.  
     * It tests against the regullar expression /[0-9]/
     * @param {Number} id - The id to be validated
     * @param {*} opts - Additional options for validation specifications
     * @returns {Array<String>} errList - Array of error messages. Empty if no errors
     */
    static validateID(id, opts) {
        let errList = new Array();
        //validate ID
        //regex `/[0-9]/`, check for only number
        let fieldRegEx = (opts?.regex || numReg);

        if (!fieldRegEx.test(id)) {
            errList.push(`Invalid ${opts.fieldName || "ID"}! ${opts.msg || (opts.fieldName || "ID") + " should be a Number!"}!`)
        }
        if (id < (opts?.len || 100)) {
            errList.push(`Invalid ${opts.fieldName || "ID"}! ${opts.fieldName || "ID"} is in the incorrect format! ID >= 100`)
        }

        return errList;
    }

    /**
     * This is a method responsible for validating an date.  
     * It tests against the regullar expression /^\d{4}-\d{2}-\d{2}$/
     * @param {Date} date - The date to be validated
     * @param {*} opts - Additional options for validation specifications
     * @returns {Array<String>} errList - Array of error messages. Empty if no errors
     */
    static validateDate(date, opts) {
        let errList = new Array();
        //validate ID
        //regex `/^\d{4}-\d{2}-\d{2}$/`, check for date format
        let fieldRegEx = (opts?.regex || dateReg);

        return errList;
    }

    /**
     * This is a method responsible for validating the employee login credentials.
     * @param {IEmployee } login - Object containing login data.   
     * {  
     *   empid: number,  
     *   password: string,  
     * }  
     * @returns {Array<String>} errList - Array of error messages. Empty if no errors
     */
    static validateEmployeeLogin(login ) {
        let errList = new Array();
        let { empid, password } = login;

        try {
            //validate employee ID
            Log.info("Validating employee ID...")
            errList.push(...this.validateID(empid, null))

            //validate password
            let pwdOpts = {
                fieldName: "password",
                regex: passRegex,
                len: 14,
                msg: "Only alphanumeral and speacial characters (!@#$%&) are accepted!"
            }
            Log.info("Validating employee password...")
            errList.push(...this.validatePassword(password, null))

            return errList
        } catch (err) {
            Log.error("Error attempting to validate Login data!")
            throw err;
        }
    }

    /**
     * This is a method responsible for validating the employee login credentials.
     * @param {IEmployee} login - Object containing login data.   
     * {  
     *   empid: number,  
     *   password: string,  
     * }  
     * @returns {Array<String>} errList - Array of error messages. Empty if no errors
     */
    static validateEmployeePinLogin(login ) {
        let errList = new Array();
        let { empid, pin } = login;

        try {
            //validate employee ID
            Log.info("Validating employee ID...")
            errList.push(...this.validateID(empid, null))

            //validate pin
            let pinOpts = {
                fieldName: "pin",
                regex: numReg,
                len: 1000
            }
            Log.info("Validating employee pin...")
            errList.push(...this.validatePin(pin, null))

            return errList
        } catch (err) {
            Log.error("Error attempting to validate Login data!")
            throw err;
        }
    }

    /**
    * This is a method responsible for validating a password string.  
    * It tests against the regullar expression /^[A-Za-z0-9!@#$%&]*$/
    * @param {String} password - The password to be validated
    * @param {Object} opts - Additional options for validation specifications
    * @returns {Array<String>} errList - Array of error messages. Empty if no errors
    */
    static validatePassword(password, opts) {
        let errList = new Array();
        //validate password

        //should be more than 14 characters
        let fieldRegEx = (opts?.regex || passRegex);

        if (typeof password == "string") {
            if (!fieldRegEx.test(password)) {
                errList.push(`Invalid ${opts.fieldName || "password"}! ${opts.msg || "Only alphanumeral and speacial characters (!@#$%&) are accepted!"}`)
            }
            if (password.length < (opts?.len || 8)) {
                errList.push(`Invalid ${opts?.fieldName || "password"}! ${opts?.fieldName || "Password"} should be more than ${(opts?.len || 1)} character!`)
            }
        } else {
            errList.push(`Invalid ${opts?.fieldName || "password"}! ${opts?.fieldName || "Password"} should be a string!`)
        }

        return errList;
    }

    /**
   * This is a method responsible for validating a pin string.  
   * It tests against the regullar expression /^[\d]/
   * @param {String} pin - The pin to be validated
   * @param {Object} opts - Additional options for validation specifications
   * @returns {Array<String>} errList - Array of error messages. Empty if no errors
   */
    static validatePin(pin, opts) {
        let errList = new Array();
        //validate pin

        //should be more than 14 characters
        let fieldRegEx = (opts?.regex || numReg);

        if (typeof pin == "string") {
            if (!fieldRegEx.test(pin)) {
                errList.push(`Invalid ${opts.fieldName || "pin"}! ${opts.msg || "Only numerical characters are accepted!"}`)
            }
            if (pin.length < (opts?.len || 4)) {
                errList.push(`Invalid ${opts.fieldName || "pin"}! ${opts.fieldName || "Pin"} should be ${(opts?.len || 4)} characters!`)
            }
        } else {
            errList.push(`Invalid ${opts.fieldName || "pin"}! ${opts.fieldName || "Pin"} should be a string!`)
        }

        return errList;
    }

    /**
     * 
     * @param {IEmployee} employee 
     * @returns {Array<String>} errList - Array of error messages. Empty if no errors 
     */
    static vaidateCreateEmployee(employee) {
        let errList = new Array();
        let { empid, firstname, lastname, password, role, auth, startdate } = employee;

        try {

            //validate employee ID
            Log.info("Validating employee ID...")
            errList.push(...this.validateID(empid, null))

            //validate firstname
            Log.info("Validating employee firstname...")
            errList.push(...this.validateNameField(firstname, { fieldName: "firstname" }))

            //validate lastname
            Log.info("Validating employee lastname...")
            errList.push(...this.validateNameField(lastname, { fieldName: "lastname" }))

            //validate role
            Log.info("Validating employee role...")
            errList.push(...this.validateTextField(role, { fieldName: "role", regex: /[a-zA-Z]/ }))

            //validate auth
            Log.info("Validating employee auth...")
            errList.push(...this.validateTextField(auth, { fieldName: "auth", regex: /[a-zA-Z]/ }))

            //validate password
            // let pwdOpts = {
            //     fieldName: "password",
            //     regex: passRegex,
            //     len: 14,
            //     msg: "Only alphanumeral and speacial characters (!@#$%&) are accepted!"
            // }
            // Log.info("Validating employee password...")
            // errList.push(...this.validatePassword(password))

            //validate startdate

            errList.push(...this.validateDate(new Date(startdate.toString()), null))

            return errList;
        } catch (err) {
            Log.error("Error attempting to validate Employee Object!")
            throw err;
        }
    }

    /**
     * 
     * @param {Object<Address>} job - The job object to be validated.
     * @returns {Array<String>} errList - Array of error messages. Empty if no errors.
     */
    static validateClientAddress(address) {
        let errList = new Array();

        return errList;
    }

    // /**
    //  * 
    //  * @param {Object<Job>} job - The job object to be validated.
    //  * @returns {Array<String>} errList - Array of error messages. Empty if no errors.
    //  */
    // static validateCreateJob(job) {
    //     let errList = new Array();
    //     let { clientid, catid, assignees, address, decription } = job;

    //     try {
    //         // //validate client ID
    //         // Log.info("Validating client ID...")
    //         // errList.push(...this.validateID(clientid))

    //         // //validate category ID 
    //         // Log.info("Validating category ID...")
    //         // errList.push(...this.validateID(catid))

    //         //validate assignees
    //         Log.info("Validating assignees IDs...")
    //         errList.push(...assignees.map((emp) => this.validateID(emp.empid, null)))

    //         //validate address
    //         Log.info("Validating address...")
    //         errList.push(...this.validateID(address, null))

    //         //validate description
    //         Log.info("Validating description...");
    //         let descOpts = {
    //             fieldName: "description",
    //             len: 30
    //         }
    //         errList.push(...this.validateTextField(decription, descOpts))

    //         return errList;
    //     } catch (err) {
    //         Log.error("Error attempting to validate Job Object!")
    //         throw err;
    //     }
    // }

    // /**
    //  * 
    //  * @param {Object<Job>} job - The job object to be validated.
    //  * @returns {Array<String>} errList - Array of error messages. Empty if no errors.
    //  */
    // static validateJob(job) {
    //     let errList = new Array();
    //     let { clientid, catid, assignees, address, decription } = job;

    //     try {
    //         // //validate client ID
    //         // if (clientid) {
    //         //     Log.info("Validating client ID...")
    //         //     errList.push(...this.validateID(clientid))
    //         // }

    //         // //validate category ID 
    //         // if (catid) {
    //         //     Log.info("Validating category ID...")
    //         //     errList.push(...this.validateID(catid))
    //         // }

    //         //validate assignees
    //         if (assignees) {
    //             Log.info("Validating assignees IDs...")
    //             errList.push(...assignees.map((emp) => this.validateID(emp.empid, null)))
    //         }

    //         //validate address
    //         if (address) {
    //             Log.info("Validating address...")
    //             errList.push(...this.validateID(address, null))
    //         }

    //         //validate description
    //         if (decription) {
    //             Log.info("Validating description...");
    //             let descOpts = {
    //                 fieldName: "description",
    //                 len: 30
    //             }
    //             errList.push(...this.validateTextField(decription, descOpts))
    //         }


    //         return errList;
    //     } catch (err) {
    //         Log.error("Error attempting to validate Job Object!")
    //         throw err;
    //     }
    // }
}