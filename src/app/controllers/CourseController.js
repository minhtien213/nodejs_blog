

const Course = require("../models/Course")
const { mongooseToObject } = require("../../util/mongoose")
const checkLoginMiddlewares = require('../middlewares/checkLoginMiddlewares')
const multerMiddleware = require('../middlewares/imageUploadHandleMiddlewares')


class CoursesController {

    //[GET] /courses/:slug
    show(req, res, next) {
      Course.findOne({slug: req.params.slug})
        .then(course => res.render('courses/show', {course: mongooseToObject(course)}))
        .catch(next)
    }

    //[GET] /courses/create 
    create(req, res, next) {
      checkLoginMiddlewares(req, res, [0], (account) => {
        res.render('courses/create' , { account: mongooseToObject(account)})
      })
    }

    // [POST] /courses/store
    store(req, res, next) {
      // Sử dụng Multer Middleware để xử lý tệp ảnh (nếu có)
      multerMiddleware(req, res, () => {
        // Nếu có file đã tải lên, sử dụng đường dẫn từ req.file
        if (req.file) {
          req.body.image = req.file.path.replace(/\\/g, '/').replace('src/public', '..')
        }
        const course = new Course(req.body)
        course.save()
          .then(() => res.redirect('/me/stored/courses'))
          .catch(next)
      })
    }

    //[GET] /courses/:id/edit 
    edit(req, res, next) {
      checkLoginMiddlewares(req, res, [0], (account) => {
        Course.findById(req.params.id)
          .then(course => res.render('courses/edit', {
            course: mongooseToObject(course),
            account: mongooseToObject(account),
          }))
          .catch(next)
      })
    }

    //[PUT] /courses/:id
    update(req, res, next) {
      

      // Sử dụng Multer Middleware để xử lý tệp ảnh (nếu có)
      multerMiddleware(req, res, () => {
        // Nếu có file đã tải lên, sử dụng đường dẫn từ req.file
        if (req.file) {
          req.body.image = req.file.path.replace(/\\/g, '/').replace('src/public', '..')
        }
        Course.updateOne( {_id: req.params.id}, req.body) //{_id: req.params.id}: id chỉnh sửa, req.body: object muốn sửa
        .then(() => res.redirect('/me/stored/courses'))
        .catch(next)
      })
    }


    //[DELETE] /courses/:id --> soft delete
    delete(req, res, next) {
      Course.delete({_id: req.params.id}) //{_id: req.params.id}: id muốn xóa
        .then(() => res.redirect('back')) //xóa xong chuyển lại trang trước đó
        .catch(next)
    }

    //[Force DELETE] /courses/:id/force --> hard delete
    forceDelete(req, res, next) {
      Course.deleteOne({_id: req.params.id}) //{_id: req.params.id}: id muốn xóa
        .then(() => res.redirect('back')) //xóa xong chuyển lại trang trước đó
        .catch(next)
    }

    //[PATCH] /courses/:id/restore
    restore(req, res, next) {
      Course.restore({_id: req.params.id})
        .then(() => res.redirect('back'))
        .catch(next)
    }

    //[POST] /courses/handle-form-actions
    handleStoredFormActions(req, res, next) {
      switch(req.body.action){
        case 'delete':
          Course.delete({ _id: { $in: req.body.courseIds} }) //{_id: req.params.id}: id muốn xóa
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
          Course.restore({ _id: { $in: req.body.courseIds} }) //{_id: req.params.id}: id muốn xóa
            .then(() => res.redirect('back')) //xóa xong chuyển lại trang trước đó
            .catch(next)
          break
        case 'deleteForce':
          Course.deleteMany({ _id: { $in: req.body.courseIds} }) //{_id: req.params.id}: id muốn xóa
            .then(() => res.redirect('back')) //xóa xong chuyển lại trang trước đó
            .catch(next)
          // res.json(req.body)
          break
        default:
          res.json({messenger: 'error'})
      }
    }

}

module.exports = new CoursesController()


// Models.phương thức({điều kiện để phương thức làm việc})