var express = require('express');
var router = express.Router();
const {DepartmentController} = require('../controllers');
const departmentController = new DepartmentController();

router.get('/all', (req, res , next) => {
    departmentController.getDepartments(req, res , next)
});

router.get('/review/all', (req, res , next) => {
    departmentController.getDepartmentReviews(req, res , next)
});

router.get('/review/:id', (req, res , next) => {
    departmentController.getDepartmentReview(req, res , next)
});

router.get('/:id', (req, res , next) => {
    departmentController.getDepartment(req, res , next)
});

router.post('/add', (req, res , next) => {
    departmentController.registerDepartment(req, res , next)
});

router.put('/update/:id', (req, res , next) => {
    departmentController.updateDepartment(req, res , next)
});

router.delete('/remove/:id', (req, res , next) => {
    departmentController.updateDepartment(req, res , next)
});

module.exports = router;