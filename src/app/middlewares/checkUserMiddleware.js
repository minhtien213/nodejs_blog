
require('dotenv').config()
const Account = require("../models/Account")
const jwt = require('jsonwebtoken')

module.exports = function checkUserMiddleware(req) {
    return new Promise((resolve, reject) => {
      const token = req.cookies.token
      if (token) {
        try {
          const secretKey = process.env.JWT_SECRET || 'minhtien'
          const result = jwt.verify(token, secretKey, { algorithm: 'HS256' })
          Account.findById({ _id: result._id })
            .then(account => {
              resolve(account)
            })
            .catch(err => {
              console.error(err)
              reject(err)
            })
        } catch (error) {
          console.error(error)
          reject(error)
        }
      } else {
        resolve(null)
      }
    })
  }


//  using:
// checkUserMiddleware(req, res)
//     .then(account => {
//         //logic
//     })
//     .catch(next)