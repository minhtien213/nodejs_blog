// các tuyến đường liên quan đến News thì tạo phương thức ở class này

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
              accountWithCart: mongooseToObject(accountWithCart.cart),
              account: mongooseToObject(account),
            })
          })
      })
    }

    //[PUT] /cart/:id
    addCart(req, res, next) {
      checkLoginMiddlewares(req, res, [0, 1], (account) => {

        // Tạo một đối tượng mới để thêm vào cart
        const courseId = req.params.id
        const cartItem = {
          courses: courseId,
          addedAt: new Date(),
        }
        Account.findOneAndUpdate(
          { _id: account._id, "cart.courses": { $ne: courseId }}, // Không tồn tại courseId trong cart.courses
          { $addToSet: { cart: cartItem } }
        )
          .then(() => res.redirect('back'))
          .catch(next)
      })
    }

    // [DELETE] /cart/:id
    removeCart(req, res, next) {
      checkLoginMiddlewares(req, res, [0, 1], (account) => {
        const courseIdToRemove = req.params.id;

        Account.updateOne(
          { _id: account._id },
          { $pull: { cart: { courses: courseIdToRemove } } }
        )
        .then(() => res.redirect('back'))
        .catch(next);
      })
    }

}

module.exports = new CartController()
