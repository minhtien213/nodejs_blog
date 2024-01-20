
const moment = require('moment')
const Product = require("../models/Product")
const checkPermissionMiddlewares = require('../middlewares/checkPermissionMiddlewares')
const { mongooseToObject, mutipleMongooseToObject } = require('../../util/mongoose')
const randomstring = require('randomstring')
const Order = require('../models/Order')
const Account = require('../models/Account')

class OrderController {
  
    //[POST] /order/order-products
    orderProducts(req, res, next) {
      checkPermissionMiddlewares(req, res, [0, 1], (account) => {
        const productIdArray = JSON.parse(req.query.productIdArray)
        Product.find({ _id: { $in: productIdArray } })
          .then((products) => {
            res.render('order/order-product', {
              products: mutipleMongooseToObject(products),
              account: mongooseToObject(account),
              cartItemCount: account ?  account.cart.length : '' 
            })
          })
        .catch(next)
      })
    }

    //[GET] /order/order-product/:id
    orderProduct(req, res, next) {
      checkPermissionMiddlewares(req, res, [0, 1], (account) => {
        const productId = req.params.id
        Product.find({ _id: { $in: productId } })
          .then((products) => {
            res.render('order/order-product', {
              products: mutipleMongooseToObject(products),
              account: mongooseToObject(account),
              cartItemCount: account ?  account.cart.length : '' 
            })
          })
        .catch(next)
      })
    }

      
    //[POST] /add-order
    async addOrder(req, res, next) {
      const _this = this
      checkPermissionMiddlewares(req, res, [0, 1], (account) => {
        const orderCode = randomstring.generate({
          length: 8,  // Độ dài của mã đơn hàng
          charset: 'alphanumeric'  // Sử dụng các ký tự và số
        }).toUpperCase()
        const data = req.body
        
        //xóa product đã mua trong cart
        data.products.forEach(product => {
          Account.updateMany(
            { 'cart.product': product.productId },
            { $pull: { cart: { product: product.productId } } }
          )
          .then(() => console.log(`Đã xóa sản phẩm.`))
          .catch(error => console.error(`Lỗi khi xóa sản phẩm`))
        })
        
        const orderData = {
          ...data,
          orderProducts: data.products,
          account: account._id,
          orderCode,
          orderStatus: 'Successed',
          addedAt: moment().format('DD/MM/YYYY'),
        }
        const order = new Order(orderData)
        order.save()
      })
    }

    //[GET] /my-orders
    myOrders(req, res, next){
      checkPermissionMiddlewares(req, res, [0, 1], (account) => {
        Order.find({ account: account._id }).populate('orderProducts.productId')
          .then((orderLists) => {
            // console.log(orderLists)
            res.render('order/my-orders', {
              orderLists: mutipleMongooseToObject(orderLists),
              account: mongooseToObject(account),
              cartItemCount: account ? account.cart.length : '',
            })
          })
          .catch(next)
      })
    }

    //[GET] /order-detail/:id
    orderDetail(req, res, next){
      checkPermissionMiddlewares(req, res, [0, 1], (account) => {
        Order.findOne({ _id: req.params.id }).populate('orderProducts.productId')
          .then((orderItem) => {
            res.render('order/order-detail', {
              orderItem: mongooseToObject(orderItem),
              account: mongooseToObject(account),
              cartItemCount: account ? account.cart.length : '',
            })
          })
          .catch(next)
      })
    }
}

module.exports = new OrderController()
