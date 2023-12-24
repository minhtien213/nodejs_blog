
const Course = require("../models/Course")
const Account = require("../models/Account")
const { mutipleMongooseToObject, mongooseToObject } = require("../../util/mongoose")
const paginationMiddlewares = require('../middlewares/paginationMiddlewares')
const checkUser = require('../middlewares/checkUser')
const checkCartItemCount = require('../middlewares/checkCartItemCount')


class SiteController {

    index(req, res, next) {
      const cartItemCount = checkCartItemCount(req) //check cart item count
      const {currentPage, skipPage} = paginationMiddlewares(req, 4) // 3 - pageSize
      checkUser(req, res)
          .then(account => {
              Promise.all([
                Course.find({}).skip(skipPage).limit(4),
                Course.countDocuments({}),
              ])
                  .then(([courses, coursesCount]) => {
                    res.render('site/home', {
                      courses: mutipleMongooseToObject(courses),
                      totalPage: Math.ceil(coursesCount / 4),
                      currentPage,
                      account: mongooseToObject(account),
                      cartItemCount
                    })
                  })
                  .catch(next)
          })
          .catch(next)
    }

    //[GET] /search
    search(req, res, next) {
      const keySearch = req.query.keysearch
      // Tìm kiếm không phân biệt chữ hoa/chữ thường với $regex và tùy chọn 'i'
      const regex = new RegExp(keySearch, 'i')
      Course.find({ name: { $regex: regex } }).skip(0).limit(2)
        .then(courses => {
          res.json(courses)
        })
        .catch(next)
    }

    //[GET] /search-results
    searchResutls(req, res, next) {
        const cartItemCount = checkCartItemCount(req) //check cart item count
        checkUser(req, res)
        .then(account => {
            const keySearch = req.query.keysearch
            const resultSize = parseInt(req.query.result) || 1
            if (keySearch) {
              // Tìm kiếm không phân biệt chữ hoa/chữ thường với $regex và tùy chọn 'i'
              const regex = new RegExp(keySearch, 'i');
              Promise.all([
                Course.find({ name: { $regex: regex } }).skip(0).limit(resultSize),
                Course.countDocuments({ name: { $regex: regex } }),
              ])
                .then(([courses, coursesCount]) => {
                  res.render('site/search', {
                    courses: mutipleMongooseToObject(courses),
                    coursesCount,
                    keySearch,
                    resultSize,
                    account: mongooseToObject(account),
                    cartItemCount
                  })
                })
                .catch(next)
            } else {
              res.status(400).json({ error: 'Invalid keySearch parameter' })
            }
        })
        .catch(next)
    }

}

module.exports = new SiteController()
