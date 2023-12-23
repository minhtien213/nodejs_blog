var express = require('express')
var router = express.Router()
const cartController = require('../app/controllers/CartController')

router.get('/:id', cartController.cart) 
router.put('/:id', cartController.addCart) 
router.delete('/:id', cartController.removeCart) 

module.exports = router
