
const Account = require("../models/Account");
const jwt = require('jsonwebtoken');

class AuthController {

  // [GET] /auth/login
  login(req, res, next) {
      res.render('auth/login');
  }

  // [GET] /auth/register
  register(req, res, next) {
    res.render('auth/register');
  }

  // [POST] /auth/login
  loginHandle(req, res, next) {
    var username = req.body.username
    var password = req.body.password
    Account.findOne({ username: username, password: password})
      .then((account) => {
        if(account){
          const username = account.username
          const token = jwt.sign({ _id: account._id }, 'minhtien213')
          res.cookie('token', token)
          res.cookie('username', username)

          const previousPath = req.cookies.previousPath || '/'; //lấy đường dẫn trước đó trong cookie nếu không có thì chuyển về trang "/" - trang home
          res.clearCookie('previousPath'); // Xóa cookie sau khi sử dụng
          
          res.redirect(previousPath); //chuyển hướng theo đường dẫn trước(trang yêu cầu phải login)
        }else{
          res.redirect('back');
        }
      })
      .catch(next)
  }

  // [GET] /auth/logout
  logoutHandle(req, res, next){
    // Xóa cookie có tên là "token" khi đăng xuất
    res.clearCookie('token');
    res.redirect('/auth/login');
  }

  // [POST] /auth/register
  registerHandle(req, res, next){
    const account = new Account(req.body)
    account.save()
    .then(() => {
      res.redirect('/auth/login')
    })
    .catch(next)
  }

}

module.exports = new AuthController();
