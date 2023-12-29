var express = require('express');
var router = express.Router();
const productController = require('../app/controllers/ProductController');

router.get('/create', productController.create); //trang con của products
router.post('/handle-stored-form-actions', productController.handleStoredFormActions);
router.post('/handle-trash-form-actions', productController.handleTrashFormActions); 
router.get('/:id/edit', productController.edit); 
router.put('/:id', productController.update); 
router.patch('/:id/restore', productController.restore); 
router.delete('/:id', productController.delete); 
router.delete('/:id/force', productController.forceDelete); 
router.post('/store', productController.store); 
router.get('/:slug', productController.show);

module.exports = router;
