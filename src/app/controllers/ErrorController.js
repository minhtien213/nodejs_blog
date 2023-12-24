
class ErrorController {

    //[GET] /error/errorAuth
    errorAuth(req, res, next) {
      res.render('error/errorAuth');
    }

    //[GET] /error/errorCart
    errorCart(req, res, next) {
      res.render('error/errorCart');
    }


}

module.exports = new ErrorController()
