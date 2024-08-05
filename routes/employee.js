var express = require('express');
var router = express.Router();
const {EmployeeController} = require('../controllers');
const employeeController = new EmployeeController();

router.get('/all', (req, res , next) => {
    employeeController.getEmployees(req, res , next)
});

router.get('/review/all', (req, res , next) => {
    employeeController.getEmployeeReviews(req, res , next)
});

router.get('/review/:id', (req, res , next) =>{
    employeeController.getEmployeeReview(req, res , next)
});

router.get('/:id', (req, res , next) =>{
    employeeController.getEmployee(req, res , next)
});

router.post('/add', (req, res , next) =>{
    employeeController.registerEmployee(req, res , next)
});

router.put('/update/:id', (req, res , next) =>{
    employeeController.updateEmployee(req, res , next)
});

router.delete('/remove/:id', (req, res , next) =>{
    employeeController.updateEmployee(req, res , next)
});


module.exports = router;