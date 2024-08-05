// const { TimeSheetService } = require("../services");
const TimeSheet = require('../models/dto');
const { Log, Validator, RestResponse } = require('../../utility');
const { sanitize, validateID } = Validator;
const { handleError, handle500Error, handle404Error, handle200Response } = require('../../utility/Functions')
const NodeCache = require('node-cache');
const cache = new NodeCache();

module.exports = class TimeSheetController {

    constructor() {
        this.depService = new TimeSheetService()
    }

    async registerTimeSheet(req, res, next) {
        //Get body from req
        let { body } = req;

        //Sanitize the TimeSheet
        // body = sanitize(body)

        //Validate fields
        let valErr = [];//vaidateCreateTimeSheet(body);

        if (valErr.length > 0) {
            let err = new Error(JSON.stringify(valErr))
            err.name = "Validation Error"
            return handle500Error(res, err, "Validation Error!");
        }

        try {
            Log.info("Attempting to create TimeSheet object...")
            //body.TimeSheetid = crypto.randomBytes(16).toString("hex");
            let timeSheet = await TimeSheet.createTimeSheet(body)
            return handle200Response(res, timeSheet, "TimeSheet has been successfully created!")
        } catch (err) {
            Log.error(err.message)
            return handleError(res, err, "TimeSheet Creation Error!", { status: 400, state: "noTimeSheetcreate" });
        }
    }

    async updateTimeSheet(req, res, next) {
        let { id } = req.params;
        let { body } = req;

        //Sanitize the timeSheet
        //TODO make a sanitize method for timeSheet data
        // body = sanitize(body);

        //validate id
        let valErr = validateID(Number(id), null);

        //Validate fields
        valErr.push(...[]);//vaidateCreateTimeSheet(body);

        if (valErr.length > 0) {
            let err = new Error(JSON.stringify(valErr))
            err.name = "Validation Error"
            return handle500Error(res, err, "Validation Error!");
        }

        try {
            Log.info("Attempting to update timeSheet with num " + String(id) + "...");
            let timeSheet = await TimeSheet.updateTimeSheet(Number(id), body);
            return handle200Response(res, timeSheet, "TimeSheet has been successfully updated!");

        } catch (err) {
            Log.error(err.message)
            return handleError(res, err, "TimeSheet Update Error!", { status: 400, state: "notimeSheetupdate" });
        }

    }

    async getTimeSheet(req, res, next) {
        let { id } = req.params;

        //validate id
        let valErr = validateID(Number(id), null);

        if (valErr.length > 0) {
            let err = new Error(JSON.stringify(valErr))
            err.name = "Validation Error"
            return handle500Error(res, err, "Validation Error!");
        }

        try {
            Log.info("Attempting to retrieve timeSheet with num " + String(id) + "...");
            let timeSheet = await TimeSheet.getTimeSheet(Number(id));
            return handle200Response(res, timeSheet, "TimeSheet has been successfully retrieved!");

        } catch (err) {
            Log.error(err.message)
            return handleError(res, err, "TimeSheet Retreival Error!", { status: 400, state: "notimeSheetget" });
        }
    }

    async getTimeSheets(req, res, next) {
        //Get body from req
        let { body } = req;

        //Sanitize the timeSheet
        //TODO make a sanitize method for timeSheet data
        //  body = sanitize(body);

        //Validate fields
        let valErr = [];//vaidateCreateTimeSheet(body);

        if (valErr.length > 0) {
            let err = new Error(JSON.stringify(valErr))
            err.name = "Validation Error"
            return handle500Error(res, err, "Validation Error!");
        }

        try {
            Log.info("Attempting to retrieve timeSheets... ");
            let timeSheets = await TimeSheet.getTimeSheetsByOptions(body);
            return handle200Response(res, timeSheets, "TimeSheets have been successfully retrieved!");
        } catch (err) {
            Log.error(err.message)
            return handleError(res, err, "TimeSheets Retreival Error!", { status: 400, state: "notimeSheetget" });
        }
    }

}