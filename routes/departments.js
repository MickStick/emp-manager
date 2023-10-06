var express = require('express');
var router = express.Router();
const {DepartmentController} = require('../controllers');
const departmentController = new DepartmentController();

router.get('/all', departmentController.getDepartments(req, res , next));

router.get('/review/all', departmentController.getDepartmentReviews(req, res , next));

router.get('/review/:id', departmentController.getDepartmentReview(req, res , next));

router.get('/:id', departmentController.getDepartment(req, res , next));

router.post('/add', departmentController.registerDepartment(req, res , next));

router.put('/update/:id', departmentController.updateDepartment(req, res , next));

router.delete('/remove/:id', departmentController.updateDepartment(req, res , next));

module.exports = router;