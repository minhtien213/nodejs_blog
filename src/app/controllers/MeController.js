
const Product = require("../models/Product");
const { mutipleMongooseToObject, mongooseToObject } = require("../../util/mongoose")
const paginationMiddlewares = require('../middlewares/paginationMiddlewares')
const checkPermissionMiddlewares = require('../middlewares/checkPermissionMiddlewares')

class meController {

    // [GET] /me/stored/products
    storedProducts(req, res, next) {
      checkPermissionMiddlewares(req, res, [0], (account) => { //truyền array roles - callback thay cho next()
        //middlewares pagination - lấy ra 2 giá trị currentPage, skipPage được trả về từ hàm paginationMiddlewares
        const {currentPage, skipPage} = paginationMiddlewares(req, 3) // 3 - pageSize
        Promise.all([
          Product.find({}).skip(skipPage).limit(3).sortable(req),
          Product.countDocuments({}),
          Product.countWithDeleted({ deleted: true })
        ])
          .then(([products, productsCount, deletedCount]) =>
            res.render("me/stored-products", {
              products: mutipleMongooseToObject(products),
              productsCount,
              totalPage: Math.ceil(productsCount / 3),
              deletedCount,
              currentPage,
              account: mongooseToObject(account),
              cartItemCount: account ?  account.cart.length : '' 
            })
          )
          .catch(next);
        });
    }
    
    // [GET] /me/trash/products
    trashProducts(req, res, next) {
      checkPermissionMiddlewares(req, res, [0], (account) => {
        //middlewares pagination - lấy ra 2 giá trị currentPage, skipPage được trả về từ hàm paginationMiddlewares
        const {currentPage, skipPage} = paginationMiddlewares(req, 3) // 3 - pageSize
        Promise.all([
          Product.findWithDeleted({ deleted: true}).skip(skipPage).limit(3).sortable(req),
          Product.countDocuments(),
          Product.countWithDeleted({ deleted: true })
        ])
          .then(([products, productsCount, deletedCount]) =>
            res.render("me/trashed-products", {
              products: mutipleMongooseToObject(products),
              productsCount,
              deletedCount,
              totalPage: Math.ceil(deletedCount / 3),
              currentPage,
              account: mongooseToObject(account),
              cartItemCount: account ?  account.cart.length : '' 
            })
          )
          .catch(next)
      })
    }
}

module.exports = new meController();
