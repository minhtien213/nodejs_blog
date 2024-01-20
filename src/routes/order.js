var express = require('express')
var router = express.Router()
const orderController = require('../app/controllers/OrderController')


router.post('/order-products', orderController.orderProducts)
router.post('/add-order', orderController.addOrder)
router.get('/order-product/:id', orderController.orderProduct)
router.get('/my-orders', orderController.myOrders)
router.get('/order-detail/:id', orderController.orderDetail)

module.exports = router
