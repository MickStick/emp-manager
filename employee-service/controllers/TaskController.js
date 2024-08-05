// const { TaskService } = require("../services");
const Task = require('../models/dto');
const { Log, Validator, RestResponse } = require('../../utility');
const { sanitize, validateID } = Validator;
const { handleError, handle500Error, handle404Error, handle200Response } = require('../../utility/Functions')
const NodeCache = require('node-cache');
const cache = new NodeCache();

module.exports = class TaskController {

    constructor() {
        this.depService = new TaskService()
    }

    async registerTask(req, res, next) {
        //Get body from req
        let { body } = req;

        //Sanitize the Task
        // body = sanitize(body)

        //Validate fields
        let valErr = [];//vaidateCreateTask(body);

        if (valErr.length > 0) {
            let err = new Error(JSON.stringify(valErr))
            err.name = "Validation Error"
            return handle500Error(res, err, "Validation Error!");
        }

        try {
            Log.info("Attempting to create Task object...")
            //body.Taskid = crypto.randomBytes(16).toString("hex");
            let task = await Task.createTask(body)
            return handle200Response(res, task, "Task has been successfully created!")
        } catch (err) {
            Log.error(err.message)
            return handleError(res, err, "Task Creation Error!", { status: 400, state: "noTaskcreate" });
        }
    }

    async updateTask(req, res, next) {
        let { id } = req.params;
        let { body } = req;

        //Sanitize the task
        //TODO make a sanitize method for task data
        // body = sanitize(body);

        //validate id
        let valErr = validateID(Number(id), null);

        //Validate fields
        valErr.push(...[]);//vaidateCreateTask(body);

        if (valErr.length > 0) {
            let err = new Error(JSON.stringify(valErr))
            err.name = "Validation Error"
            return handle500Error(res, err, "Validation Error!");
        }

        try {
            Log.info("Attempting to update task with num " + String(id) + "...");
            let task = await Task.updateTask(Number(id), body);
            return handle200Response(res, task, "Task has been successfully updated!");

        } catch (err) {
            Log.error(err.message)
            return handleError(res, err, "Task Update Error!", { status: 400, state: "notaskupdate" });
        }

    }

    async getTask(req, res, next) {
        let { id } = req.params;

        //validate id
        let valErr = validateID(Number(id), null);

        if (valErr.length > 0) {
            let err = new Error(JSON.stringify(valErr))
            err.name = "Validation Error"
            return handle500Error(res, err, "Validation Error!");
        }

        try {
            Log.info("Attempting to retrieve task with num " + String(id) + "...");
            let task = await Task.getTask(Number(id));
            return handle200Response(res, task, "Task has been successfully retrieved!");

        } catch (err) {
            Log.error(err.message)
            return handleError(res, err, "Task Retreival Error!", { status: 400, state: "notaskget" });
        }
    }

    async getTasks(req, res, next) {
        //Get body from req
        let { body } = req;

        //Sanitize the task
        //TODO make a sanitize method for task data
        //  body = sanitize(body);

        //Validate fields
        let valErr = [];//vaidateCreateTask(body);

        if (valErr.length > 0) {
            let err = new Error(JSON.stringify(valErr))
            err.name = "Validation Error"
            return handle500Error(res, err, "Validation Error!");
        }

        try {
            Log.info("Attempting to retrieve tasks... ");
            let tasks = await Task.getTasksByOptions(body);
            return handle200Response(res, tasks, "Tasks have been successfully retrieved!");
        } catch (err) {
            Log.error(err.message)
            return handleError(res, err, "Tasks Retreival Error!", { status: 400, state: "notaskget" });
        }
    }

}