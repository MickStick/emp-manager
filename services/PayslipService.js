const Payslips = require("../models/payslips")

module.exports = class PayslipServcie{

    constructor(){

    }

    /**
     * This is a method that, using the sequelize Payslips model, should create and add
     * to the database, a new payslip object/record.
     * @param {Object} body 
     * @returns {Payslips} Response Object
     */
    async addPayslipData(body){
        const resData = await Payslips.create(body)

        if (resData == null || resData == "undefined") {
            return //Error Handling
        }

        return resData;
    }

    /**
     * This is a method that, using the sequelize Payslips model, should get a specified
     * payslips object determined by the employee id.
     * @param {Number} empid 
     * @returns {Payslips} Response Object
     */
    async retreivePayslipData(empid){
        const resData = await Payslips.findAll({
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
     * This is a method that, using the sequelize Payslips model, should get a list of
     * payslip objects/records determined by the employee id.
     * @returns {Payslips} Response Object
     */
    async retreivePayslipList(empid){
        const resData = await Payslips.findAll({
            where: {
                empid: empid
            }
        })

        if (resData == null || resData == "undefined") {
            return //Error Handling
        }

        return resData;
    }

    /**
     * This is a method that, using the sequelize Payslips model, should update a
     * specific payslip object/record determined by the payslip id.
     * @param {Number} slipid 
     * @param {Object} body 
     * @returns {Payslips} Response Object
     */
    async updatePayslipData(slipid, body){
        const resData = await Payslips.update(
            body,
            {
                where: {
                    id: slipid
                }
            }
        )

        if (resData == null || resData == "undefined") {
            return //Error Handling
        }

        return resData;
    }
}