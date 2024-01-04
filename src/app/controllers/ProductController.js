

const Product = require("../models/Product")
const { mongooseToObject } = require("../../util/mongoose")
const checkPermissionMiddlewares = require('../middlewares/checkPermissionMiddlewares')
const multerMiddleware = require('../middlewares/multerMiddleware')
const checkUserMiddleware = require('../middlewares/checkUserMiddleware')


class ProductsController {

    //[GET] /products/:slug
    show(req, res, next) {
      checkUserMiddleware(req, res)
        .then(account => {
          Product.findOne({slug: req.params.slug})
          .then(product => res.render('products/show', {
            product: mongooseToObject(product),
            account: mongooseToObject(account),
            cartItemCount: account ?  account.cart.length : '' 
          }))
          .catch(next)
        })
        .catch(next);
    }

    //[GET] /products/create 
    create(req, res, next) {
      checkPermissionMiddlewares(req, res, [0], (account) => {
        res.render('products/create' , { 
          account: mongooseToObject(account),
          cartItemCount: account ?  account.cart.length : '' 
        })
      })
    }

    // [POST] /products/store
    store(req, res, next) {
      // Sử dụng Multer Middleware để xử lý tệp ảnh (nếu có)
      multerMiddleware(req, res, () => {
        // Nếu có files đã tải lên, sử dụng đường dẫn từ req.files
        req.body.images = req.files ? req.files.map((file) => 
        file.path.replace(/\\/g, '/').replace('src/public', '..')) : null
        const product = new Product(req.body)
        product.save()
          .then(() => res.redirect('/me/stored/products'))
          .catch(next)
      })
    }

    //[GET] /products/:id/edit 
    edit(req, res, next) {
      checkPermissionMiddlewares(req, res, [0], (account) => {
        Product.findById(req.params.id)
          .then(product => res.render('products/edit', {
            product: mongooseToObject(product),
            account: mongooseToObject(account),
            cartItemCount: account ?  account.cart.length : '' 
          }))
          .catch(next)
      })
    }

    //[PUT] /products/:id
    update(req, res, next) {
      // Sử dụng Multer Middleware để xử lý tệp ảnh (nếu có)
      multerMiddleware(req, res, () => {
        // Kiểm tra xem có files được tải lên hay không
        if (!req.files) {
          // Nếu không có files, chỉ cập nhật các trường khác không liên quan đến ảnh
          Product.updateOne( {_id: req.params.id}, req.body) //{_id: req.params.id}: id chỉnh sửa, req.body: object muốn sửa
            .then(() => res.redirect('/me/stored/products'))
            .catch(next)
        } else {
            // Nếu có files đã tải lên, sử dụng đường dẫn từ req.files
            req.body.images = req.files ? req.files.map((file) => 
            file.path.replace(/\\/g, '/').replace('src/public', '..')) : null
            Product.updateOne( {_id: req.params.id}, req.body) //{_id: req.params.id}: id chỉnh sửa, req.body: object muốn sửa
              .then(() => res.redirect('/me/stored/products'))
              .catch(next)
        }


      })
    }


    //[DELETE] /products/:id --> soft delete
    delete(req, res, next) {
      Product.delete({_id: req.params.id}) //{_id: req.params.id}: id muốn xóa
        .then(() => res.redirect('back')) //xóa xong chuyển lại trang trước đó
        .catch(next)
    }

    //[Force DELETE] /products/:id/force --> hard delete
    forceDelete(req, res, next) {
      Product.deleteOne({_id: req.params.id}) //{_id: req.params.id}: id muốn xóa
        .then(() => res.redirect('back')) //xóa xong chuyển lại trang trước đó
        .catch(next)
    }

    //[PATCH] /products/:id/restore
    restore(req, res, next) {
      Product.restore({_id: req.params.id})
        .then(() => res.redirect('back'))
        .catch(next)
    }

    //[POST] /products/handle-form-actions
    handleStoredFormActions(req, res, next) {
      switch(req.body.action){
        case 'delete':
          Product.delete({ _id: { $in: req.body.productIds} }) //{_id: req.params.id}: id muốn xóa
            .then(() => res.redirect('back')) //xóa xong chuyển lại trang trước đó
            .catch(next)
          break
        default:
          res.json({messenger: 'error'})
      }
    }

    handleTrashFormActions( req, res, next ){
      switch(req.body.action){
        case 'resoteAll':
          Product.restore({ _id: { $in: req.body.productIds} }) //{_id: req.params.id}: id muốn xóa
            .then(() => res.redirect('back')) //xóa xong chuyển lại trang trước đó
            .catch(next)
          break
        case 'deleteForce':
          Product.deleteMany({ _id: { $in: req.body.productIds} }) //{_id: req.params.id}: id muốn xóa
            .then(() => res.redirect('back')) //xóa xong chuyển lại trang trước đó
            .catch(next)
          // res.json(req.body)
          break
        default:
          res.json({messenger: 'error'})
      }
    }

}

module.exports = new ProductsController()


// Models.phương thức({điều kiện để phương thức làm việc})