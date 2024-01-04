
const Product = require("../models/Product")
const Account = require("../models/Account")
const { mutipleMongooseToObject, mongooseToObject } = require("../../util/mongoose")
const paginationMiddlewares = require('../middlewares/paginationMiddlewares')
const multerMiddleware = require('../middlewares/multerMiddleware')
const checkUserMiddleware = require('../middlewares/checkUserMiddleware')
const checkPermissionMiddlewares = require('../middlewares/checkPermissionMiddlewares')


class SiteController {

    index(req, res, next) {
      const {currentPage, skipPage} = paginationMiddlewares(req, 4) // 3 - pageSize
      checkUserMiddleware(req, res)
          .then(account => {
              Promise.all([
                Product.find({}).skip(skipPage).limit(4),
                Product.countDocuments({}),
              ])
                .then(([products, productsCount]) => {
                  res.render('site/home', {
                    products: mutipleMongooseToObject(products),
                    totalPage: Math.ceil(productsCount / 4),
                    currentPage,
                    account: mongooseToObject(account),
                    cartItemCount: account ?  account.cart.length : '' 
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
      Product.find({ name: { $regex: regex } }).skip(0).limit(2)
        .then(products => {
          res.json(products)
        })
        .catch(next)
    }

    //[GET] /search-results
    searchResutls(req, res, next) {
        checkUserMiddleware(req, res)
        .then(account => {
            const keySearch = req.query.keysearch
            const resultSize = parseInt(req.query.result) || 2
            if (keySearch) {
              // Tìm kiếm không phân biệt chữ hoa/chữ thường với $regex và tùy chọn 'i'
              const regex = new RegExp(keySearch, 'i');
              Promise.all([
                Product.find({ name: { $regex: regex } }).skip(0).limit(resultSize),
                Product.countDocuments({ name: { $regex: regex } }),
              ])
                .then(([products, productsCount]) => {
                  res.render('site/search', {
                    products: mutipleMongooseToObject(products),
                    productsCount,
                    keySearch,
                    resultSize,
                    account: mongooseToObject(account),
                    cartItemCount: account ?  account.cart.length : '' 
                  })
                })
                .catch(next)
            } else {
              res.status(400).json({ error: 'Invalid keySearch parameter' })
            }
        })
        .catch(next)
    }

    //[GET] /my-account
    myAccount(req, res, next) {
      checkPermissionMiddlewares(req, res, [0, 1], (account) => {
        res.render('site/myAccount', {
          account: mongooseToObject(account),
          cartItemCount: account ?  account.cart.length : '' 
        })
      })
    }

    //[PUT] /my-account
    myAccountUpdate(req, res, next){
      checkUserMiddleware(req, res)
        .then(account => {
            // Sử dụng Multer Middleware để xử lý tệp ảnh (nếu có)
            multerMiddleware(req, res, () => {
              // Kiểm tra xem có files được tải lên hay không
              if (!req.files) {
                // Nếu không có files, chỉ cập nhật các trường khác không liên quan đến ảnh
                Account.updateOne({_id: account._id}, req.body)
                    .then(() => res.redirect('back'))
                    .catch(next);
              } else {
                  // Nếu có files đã tải lên, sử dụng đường dẫn từ req.files
                  req.body.images = req.files ? req.files.map((file) => 
                  file.path.replace(/\\/g, '/').replace('src/public', '..')) : null
                  // Nếu có files, cập nhật cả trường ảnh và các trường khác
                  Account.updateOne({_id: account._id}, req.body)
                      .then(() => res.redirect('back'))
                      .catch(next);
              }
            })
        })
        .catch(next)
    }
}

module.exports = new SiteController()
