
const moment = require('moment')
const mongoose = require('mongoose')
const Account = require("../models/Account")
const { mongooseToObject } = require('../../util/mongoose')
const checkLoginMiddlewares = require('../middlewares/checkLoginMiddlewares')


class CartController {

    //[GET] /cart/:id
    cart(req, res, next) {
      checkLoginMiddlewares(req, res, [0, 1], (account) => {
        Account.findById({ _id: account._id}).populate({ path: 'cart.products', model: 'Product' })
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
        const productId = req.params.id
        const cartItem = {
          products: mongoose.Types.ObjectId(productId),
          addedAt: moment().format('DD/MM/YYYY'),
        }
        Account.findOneAndUpdate(
          { _id: account._id, "cart.products": { $ne: productId }}, // Không tồn tại productId trong cart.products
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
        const productIdToRemove = req.params.id;

        Account.findOneAndUpdate(
          { _id: account._id },
          { $pull: { cart: { products: productIdToRemove } } },
          { new: true } // Trả về tài liệu sau khi cập nhật
        )
          .then(() => { res.redirect('back')})
          .catch(next)
      })
    }

}

module.exports = new CartController()
