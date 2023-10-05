var express = require('express');
var router = express.Router();
const {EmployeeController} = require('../controllers');
const employeeController = new EmployeeController();

router.get('/all', employeeController.getEmployees(req, res , next));

router.get('/review/all', employeeController.getEmployeeReviews(req, res , next));

router.get('/review/:id', employeeController.getEmployeeReview(req, res , next));

router.get('/:id', employeeController.getEmployee(req, res , next));

router.post('/add', employeeController.registerEmployee(req, res , next));

router.put('/update/:id', employeeController.updateEmployee(req, res , next));

router.delete('/remove/:id', employeeController.updateEmployee(req, res , next));


module.exports = router;