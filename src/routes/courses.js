var express = require('express');
var router = express.Router();
const courseController = require('../app/controllers/CourseController');

router.get('/create', courseController.create); //trang con của courses
router.post('/handle-stored-form-actions', courseController.handleStoredFormActions);
router.post('/handle-trash-form-actions', courseController.handleTrashFormActions); 
router.get('/:id/edit', courseController.edit); 
router.put('/:id', courseController.update); 
router.patch('/:id/restore', courseController.restore); 
router.delete('/:id', courseController.delete); 
router.delete('/:id/force', courseController.forceDelete); 
router.post('/store', courseController.store); 
router.get('/:slug', courseController.show);
router.get('/', courseController.courses); 

module.exports = router;
