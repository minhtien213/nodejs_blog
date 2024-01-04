
const jwt = require('jsonwebtoken')
const Account = require('../models/Account')

function checkPermissionMiddlewares(req, res, allowedListRoles , next) { //next: nhận 1 callback
 
    const token = req.cookies.token
      if (token) {
        const secretKey = process.env.JWT_SECRET || 'minhtien'
        const result = jwt.verify(token, secretKey, { algorithm: 'HS256' })
        Account.findById({_id: result._id})
          .then(account => {
            if (account && allowedListRoles.includes(account.role)){
              next(account) //truyền account qua view
            }else{
              const currentPath = req.originalUrl // lấy đường dẫn hiện tại trước chuyển đến login
              res.cookie('previousPath', currentPath, { maxAge: 60000 }) //lưu vào cookies đường dẫn hiện tại
              res.redirect('/error/errorAuth') 
            }
          })
          .catch(next)
        
      } else {
        const currentPath = req.originalUrl // lấy đường dẫn hiện tại trước chuyển đến login
        res.cookie('previousPath', currentPath, { maxAge: 60000 }) //lưu vào cookies đường dẫn hiện tại
        res.redirect('/auth/login')
      }
}

module.exports = checkPermissionMiddlewares