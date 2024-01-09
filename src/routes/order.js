var express = require('express')
var router = express.Router()
const orderController = require('../app/controllers/OrderController')


router.post('/orderDetails', orderController.orderDetails)
router.get('/orderDetail/:id', orderController.orderDetail)

module.exports = router
