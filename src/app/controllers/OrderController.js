
const Product = require("../models/Product")
const checkPermissionMiddlewares = require('../middlewares/checkPermissionMiddlewares')
const { mongooseToObject, mutipleMongooseToObject } = require('../../util/mongoose')


class OrderController {
  
    //[POST] /order/orderDetails
    orderDetails(req, res, next) {
      checkPermissionMiddlewares(req, res, [0, 1], (account) => {
        const productIdArray = JSON.parse(req.query.productIdArray)
        Product.find({ _id: { $in: productIdArray } })
          .then((products) => {
            res.render('order/orderDetail', {
              products: mutipleMongooseToObject(products),
              account: mongooseToObject(account),
              cartItemCount: account ?  account.cart.length : '' 
          })
          })
      })
    }


    //[GET] /order/orderDetail/:id
    orderDetail(req, res, next) {
      checkPermissionMiddlewares(req, res, [0, 1], (account) => {
        const productId = req.params.id
        Product.find({ _id: { $in: productId } })
          .then((products) => {
            res.render('order/orderDetail', {
              products: mutipleMongooseToObject(products),
              account: mongooseToObject(account),
              cartItemCount: account ?  account.cart.length : '' 
          })
          })
      })
    }
    
}

module.exports = new OrderController()
