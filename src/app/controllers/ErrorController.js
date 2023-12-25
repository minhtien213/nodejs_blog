const { mongooseToObject } = require("../../util/mongoose")
const checkUser = require('../middlewares/checkUser')

class ErrorController {

    //[GET] /error/errorAuth
    errorAuth(req, res, next) {
      checkUser(req, res)
        .then(account => {
          res.render('error/errorAuth', {
            account: mongooseToObject(account),
            cartItemCount: account ?  account.cart.length : '' 
          });
        })
        .catch(next)
    }

    //[GET] /error/errorCart
    errorCart(req, res, next) {
      res.render('error/errorCart')
    }

}

module.exports = new ErrorController()
