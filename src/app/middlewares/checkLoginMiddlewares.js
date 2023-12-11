
const jwt = require('jsonwebtoken');
const Account = require('../models/Account');

function checkLoginMiddlewares(req, res, allowedListRoles , next) { //next: nhận 1 callback
 
    const token = req.cookies.token
      if (token) {
        const result = jwt.verify(token, 'minhtien213');
        Account.findById({_id: result._id})
          .then(account => {
            if (account && allowedListRoles.includes(account.role)){
              const username = account.username
              next(username) //truyền account qua view
            }else{
              res.redirect('/error') //thay trang ERROR
            }
          })
          .catch(next)
        
      } else {
        const currentPath = req.originalUrl; // lấy đường dẫn hiện tại trước chuyển đến login
        res.cookie('previousPath', currentPath, { maxAge: 60000 }) //lưu vào cookies đường dẫn hiện tại
        res.redirect('/auth/login');
      }
}

module.exports = checkLoginMiddlewares