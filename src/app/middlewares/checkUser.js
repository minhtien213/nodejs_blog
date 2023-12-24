
require('dotenv').config()
const Account = require("../models/Account")
const jwt = require('jsonwebtoken')

module.exports = function checkUser(req) {
    return new Promise((resolve, reject) => {
      const token = req.cookies.token
      if (token) {
        try {
          // const cartItemCount = req.cookies.cartItemCount || 0
          const secretKey = process.env.JWT_SECRET || 'minhtien'
          const result = jwt.verify(token, secretKey, { algorithm: 'HS256' })
          Account.findById({ _id: result._id })
            .then(account => {
              resolve(account)
            })
            .catch(err => {
              console.error(err)
              reject(err);
            });
        } catch (error) {
          console.error(error)
          reject(error)
        }
      } else {
        resolve()
      }
    })
  }


//   use:
// checkUser(req, res)
//     .then(username => {
//         //logic
//     })
//     .catch(next);