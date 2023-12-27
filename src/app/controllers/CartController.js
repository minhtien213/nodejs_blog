
const moment = require('moment')
const mongoose = require('mongoose')
const Course = require("../models/Course")
const Account = require("../models/Account")
const checkUser = require('../middlewares/checkUser')
const { mongooseToObject } = require('../../util/mongoose')
const checkLoginMiddlewares = require('../middlewares/checkLoginMiddlewares')


class CartController {

    //[GET] /cart/:id
    cart(req, res, next) {
      checkLoginMiddlewares(req, res, [0, 1], (account) => {
        Account.findById({ _id: account._id}).populate({ path: 'cart.courses', model: 'Course' })
          .then((accountWithCart) =>{
            res.render('site/cart' , { 
              cartItems: mongooseToObject(accountWithCart.cart),
              account: mongooseToObject(account),
              cartItemCount: account ?  account.cart.length : '' 
            })
          })
          .catch(next)
      })
    }

    //[PUT] /cart/:id
    addCart(req, res, next) {
      checkLoginMiddlewares(req, res, [0, 1], (account) => {

        // Tạo một đối tượng mới để thêm vào cart
        const courseId = req.params.id
        const cartItem = {
          courses: mongoose.Types.ObjectId(courseId),
          addedAt: moment().format('DD/MM/YYYY'),
        }
        Account.findOneAndUpdate(
          { _id: account._id, "cart.courses": { $ne: courseId }}, // Không tồn tại courseId trong cart.courses
          { $addToSet: { cart: cartItem } },
          { new: true } // Trả về document sau khi cập nhật
        )
          .then(() => { res.redirect('back')})
          .catch(next)
      })
    }

    // [DELETE] /cart/:id
    removeCart(req, res, next) {
      checkLoginMiddlewares(req, res, [0, 1], (account) => {
        const courseIdToRemove = req.params.id;

        Account.findOneAndUpdate(
          { _id: account._id },
          { $pull: { cart: { courses: courseIdToRemove } } },
          { new: true } // Trả về tài liệu sau khi cập nhật
        )
          .then(() => { res.redirect('back')})
          .catch(next)
      })
    }

}

module.exports = new CartController()
