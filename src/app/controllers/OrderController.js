
const moment = require('moment')
const randomstring = require('randomstring')
const nodemailer = require('nodemailer')
const Product = require("../models/Product")
const checkPermissionMiddlewares = require('../middlewares/checkPermissionMiddlewares')
const { mongooseToObject, mutipleMongooseToObject } = require('../../util/mongoose')
const Order = require('../models/Order')
const Account = require('../models/Account')

// Cấu hình Nodemailer
// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: 'minhtien213tv@gmail.com',
//     pass: 'xxxxxxxxxx',
//   },
// })

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
    addOrder(req, res, next) {
      checkPermissionMiddlewares(req, res, [0, 1], (account) => {
        const orderCode = randomstring.generate({
          length: 8,  // Độ dài của mã đơn hàng
          charset: 'alphanumeric'  // Sử dụng các ký tự và số
        }).toUpperCase()
        const data = req.body
        console.log(data)
        const productIds = data.products.map(product => product.productId)
        //xóa product đã mua trong cart
          Account.findOneAndUpdate(
            { _id: account._id },
            { $pull: { cart: { product: { $in: productIds } } } },
            { new: true },
          )
          .then((account) => {
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
              .then((order) =>{
                // console.log(order)
                // // Gửi email
                // const mailOptions = {
                //   from: 'minhtien213tv@gmail.com',
                //   to: 'minhtien213@gmail.com',
                //   subject: 'Đơn hàng của bạn đã được hoàn tất',
                //   text: 'Cảm ơn bạn đã đặt hàng. Đơn hàng của bạn đã được hoàn tất.',
                // }
                // transporter.sendMail(mailOptions, (error, info) => {
                //   if (error) {
                //     console.error(error);
                //     return res.status(500).send('Đã có lỗi xảy ra khi gửi email.')
                //   } else {
                //     console.log('Email sent: ' + info.response);
                //     // Thực hiện các lệnh phản hồi khác sau khi gửi email thành công
                //     res.status(200).send('Đơn hàng đã được hoàn tất và email đã được gửi.')
                //   }
                // })
                res.json({ success: true, redirect: `/order/order-detail/${order._id}` })
              })
              .catch(next)
          })
          .catch(error => console.error(`Lỗi khi xóa sản phẩm`))
      })
    }

    //[GET] /my-orders
    myOrders(req, res, next){
      checkPermissionMiddlewares(req, res, [0, 1], (account) => {
        Order.find({ account: account._id }).populate('orderProducts.productId')
          .then((orderLists) => {
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
