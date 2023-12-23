
require('dotenv').config()
const Account = require("../models/Account")
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const checkUser = require('../middlewares/checkUser')
const { mongooseToObject } = require('../../util/mongoose')

class AuthController {

  // [GET] /auth/login
  login(req, res, next) {
    checkUser(req, res)
      .then(account => {
          res.render('auth/login', {account: mongooseToObject(account)})
      })
      .catch(next)
  }

  // [GET] /auth/register
  register(req, res, next) {
    checkUser(req, res)
      .then(username => {
          res.render('auth/register', {username})
      })
      .catch(next)
  }

  // [POST] /auth/login
  loginHandle(req, res, next) {
    var username = req.body.username
    var password = req.body.password
    Account.findOne({ username: username})
      .then((account) => {
        if(account && bcrypt.compareSync(password, account.password)){
          // Sử dụng biến môi trường thay cho secretKey tực tiếp
          const secretKey = process.env.JWT_SECRET || 'minhtien'
          const token = jwt.sign({ _id: account._id }, secretKey, { algorithm: 'HS256' }) //{ algorithm: 'HS256' } - thuật toán tạo token
          res.cookie('token', token, { httpOnly: true, secure: true, maxAge: 900000 }) //hạn sống token 15p

          const previousPath = req.cookies.previousPath || '/' //lấy đường dẫn trước đó trong cookie nếu không có thì chuyển về trang "/" - trang home
          res.clearCookie('previousPath') // Xóa cookie sau khi sử dụng
          
          res.redirect(previousPath) //chuyển hướng theo đường dẫn trước(trang yêu cầu phải login)
        }else{
          res.redirect('back')
        }
      })
      .catch(next)
  }

  // [GET] /auth/logout
  logoutHandle(req, res, next){
    // Xóa cookie có tên là "token" khi đăng xuất
    res.clearCookie('token')
    res.redirect('/auth/login')
  }

  // [POST] /auth/register
  async registerHandle (req, res, next){
    try {
      // Hash mật khẩu trước khi lưu vào cơ sở dữ liệu
      const hashedPassword = await bcrypt.hash(req.body.password, 10)
  
      // Tạo tài khoản mới với mật khẩu đã hash
      const account = new Account({
        ...req.body,
        password: hashedPassword
      })
  
      // Lưu tài khoản vào cơ sở dữ liệu
      await account.save()
  
      res.redirect('/auth/login')
    } catch (error) {
      next(error)
    }
  }

}

module.exports = new AuthController()
