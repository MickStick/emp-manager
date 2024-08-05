import { verify } from 'jsonwebtoken';
import {Request, Response, NextFunction} from 'express'
import  { Log, RestResponse } from './';

/**
 * this method is for handling any error responses using the Express Response
 * Object. A specific message is logged as well.
 * 
 * @param {Response} res - Express Response Object
 * @param {Error} err - Error Object to be returned
 * @param {String} msg - Friendly error message summary
 * @param {Object | any} opts - Error handling specifications
 * @returns {Response}
 */
function handleError(res, err, msg, opts) {
    let response = new RestResponse()
    Log.error(err.message ? err.message : JSON.stringify(err));
    res.status(opts.status);
    response.status = opts.status;
    response.state = opts.state;
    response.message = msg;
    response.err = {
        message: err.message,
        err: err
    };
    return res.json(response)
}

/**
 * this method is for handling 500 error responses using the Express Response
 * Object. A specific message is logged as well.
 * 
 * @param {Response} res - Express Response Object
 * @param {Error} err - Error Object to be returned
 * @param {String} msg - Friendly error message summary
 * @returns {Response}
 */
function handle500Error(res, err, msg) {
    let response = new RestResponse()
    Log.error(err.message ? err.message : JSON.stringify(err));
    res.status(500);
    response.status = 500;
    response.state = "failed";
    response.message = msg;
    response.err = {
        message: err.message,
        err: err.name.toLowerCase().includes("sequelize" || "sql" || "query") ? new Error(err.message) : err
    };
    return res.json(response)
}

/**
 * this method is for handling not found error responses using the Express Response
 * Object. A specific message is logged as well.
 * 
 * @param {Response} res - Express Response Object
 * @param {Error} err - Error Object to be returned
 * @param {String} msg - Friendly error message summary
 * @returns {Response}
 */
function handle404Error(res, err, msg) {
    let response = new RestResponse()
    Log.error(err.message ? err.message : JSON.stringify(err));
    res.status(404);
    response.status = 404;
    response.state = "notfound";
    response.message = msg;
    response.err = {
        message: err.message,
        err: err
    };
    return res.json(response)
}

/**
 * this method is for handling 200 successfuk responses using the Express Response
 * Object. A specific message is logged as well.
 * 
 * @param {Response} res - Express Response Object
 * @param {Object} body - Object to be returned in the response
 * @param {String} msg - Friendly error message summary
 * @returns {Response} - Response to the client
 */
function handle200Response(res, body, msg) {
    let response = new RestResponse()
    Log.success(msg);
    res.status(200);
    response.status = 200;
    response.state = "success";
    response.message = msg;
    response.body = body;
    return res.json(response);
}

/**
 * This is a middleware function responsible for checking if a request user is
 * autheticated or not. It simple contines if authenticated 
 * @param {Request} req 
 * @param {Response} res 
 * @param {Function} next 
 * @throws - 401 Authentication Error
 * @returns 
 */
async function isAuthenticated(req, res, next) {

    const authHeader = req.headers['authorization'];

    const token = authHeader && authHeader.split(' ')[1];
    // If no token, send a 401 error
    if (!token) {
        let err = new Error("No Authentication Token Provided!")
        err.name = "Authentication Error";
        let opts = {
            status: 401,
            state: "failure"
        }
        return handleError(res, err, err.name, opts)
    }

    // Verify the token using the jwt.verify method
    verify(token, process.env.JWT_SECRET, (err, user) => {
        // If the token is invalid, send a 403 error
        if (err) {
            Log.error(err.message)
            let error = new Error("Invalid Token Provided!")
            error.name = "Authorization Error";
            let opts = {
                status: 403,
                state: "failure"
            }
            return handleError(res, error, error.name, opts)
        }
        // If the token is valid, continue
        Log.info("User is authenticated...");
        // Call the next middleware
        next();
    });
}

async function isAuthorized(req, res, next) {
    // Check if the user/employee is attached to the request object
    if (req.session && req.session.user) {
        let { user } = req.session
        if (user?.role === "admin" || user?.role === "admin") {
            Log.info("User is Authorized for this endpoint!");
            next();
        } else {
            let err = new Error("User Not Authorized For Endpoint Access!");
            err.name = "Authorization Error";
            let opts = {
                status: 403,
                state: "failure"
            }
            return handleError(res, err, err.name, opts)
        }
    } else {
        let err = new Error("User Not Authenticated!")
        err.name = "Authentication Error";
        let opts = {
            status: 401,
            state: "failure"
        }
        return handleError(res, err, err.name, opts)
    }

    next()
}

export {
    handleError,
    isAuthenticated,
    isAuthorized,
    handle500Error,
    handle404Error,
    handle200Response
}