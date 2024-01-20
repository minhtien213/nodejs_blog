
require('dotenv').config()
const Account = require("../models/Account")
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const checkUserMiddleware = require('../middlewares/checkUserMiddleware')
const { mongooseToObject } = require('../../util/mongoose')

class AuthController {

  // [GET] /auth/login
  login(req, res, next) {
    checkUserMiddleware(req, res)
      .then(account => {
          res.render('auth/login', {account: mongooseToObject(account)})
      })
      .catch(next)
  }

  // [GET] /auth/register
  register(req, res, next) {
    checkUserMiddleware(req, res)
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
          res.cookie('token', token, { httpOnly: true, secure: true, maxAge: 9000000 }) //hạn sống token 15p

          const previousPath = req.cookies.previousPath || '/' //lấy đường dẫn trước đó trong cookie nếu không có thì chuyển về trang "/" - trang home
          res.clearCookie('previousPath', { path: '/' }) // Xóa cookie sau khi sử dụng
          
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
  registerHandle (req, res, next){
    const username = req.body.username.trim()
    Account.findOne({username: username})
      .then(account =>{
        if(account){
          res.send("Đã tồn tại Username: " + username)
        }else{
          const password = req.body.password.trim()
          const passwordConfirm = req.body.password_confirm.trim()
          if(password === passwordConfirm){
            // Hash mật khẩu trước khi lưu vào cơ sở dữ liệu
            bcrypt.hash(req.body.password, 10)
              .then(hashedPassword => {
                // Tạo tài khoản mới với mật khẩu đã hash
                const account = new Account({
                  ...req.body,
                  password: hashedPassword
                })
                // Lưu tài khoản vào cơ sở dữ liệu
                account.save()
                res.redirect('/auth/login')
              })
              .catch(next)
          }else{
            res.redirect('back')
        }
      }
    })
  }

  //[GET] /auth/reset-password
  resetPassword(req, res, next) {
    checkUserMiddleware(req, res)
      .then(account => {
          res.render('auth/resetPassword', {account: mongooseToObject(account)})
      })
      .catch(next)
  }

  //[PUT] /auth/reset-password
   resetPasswordHandle(req, res, next) {
        const username = req.body.username.trim()
        const name = req.body.name.trim()
        Account.findOne({username: username, name: name})
          .then(account => {
            if(account){
              const password = req.body.password.trim()
              const passwordConfirm = req.body.password_confirm.trim()
              if(password === passwordConfirm){
                bcrypt.hash(password, 10)
                  .then((hashedPassword) => {
                    Account.findOneAndUpdate({_id: account._id}, {password: hashedPassword}, {new: true})
                      .then(() => {
                        res.redirect('login')
                      })
                      .catch(next)
                  })
                  .catch(next)
              }else{
                res.send('Thông tin Mật khẩu và Xác nhận mật khẩu không khớp!')
              }
            }else{
              res.send(`Thông tin Username (${username}) và Name (${name}) không chính xác!` )
            }
          })
          .catch(next)
  }
}

module.exports = new AuthController()
