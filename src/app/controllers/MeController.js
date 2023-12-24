
const Course = require("../models/Course");
const { mutipleMongooseToObject, mongooseToObject } = require("../../util/mongoose")
const paginationMiddlewares = require('../middlewares/paginationMiddlewares')
const checkLoginMiddlewares = require('../middlewares/checkLoginMiddlewares')

class meController {

    // [GET] /me/stored/courses
    storedCourses(req, res, next) {
      checkLoginMiddlewares(req, res, [0], (account) => { //truyền array roles - callback thay cho next()
        //middlewares pagination - lấy ra 2 giá trị currentPage, skipPage được trả về từ hàm paginationMiddlewares
        const {currentPage, skipPage} = paginationMiddlewares(req, 3) // 3 - pageSize
        Promise.all([
          Course.find({}).skip(skipPage).limit(3).sortable(req),
          Course.countDocuments({}),
          Course.countWithDeleted({ deleted: true })
        ])
          .then(([courses, coursesCount, deletedCount]) =>
            res.render("me/stored-courses", {
              courses: mutipleMongooseToObject(courses),
              coursesCount,
              totalPage: Math.ceil(coursesCount / 3),
              deletedCount,
              currentPage,
              account: mongooseToObject(account),
              cartItemCount: account ?  account.cart.length : '' 
            })
          )
          .catch(next);
        });
    }
    
    // [GET] /me/trash/courses
    trashCourses(req, res, next) {
      checkLoginMiddlewares(req, res, [0], (account) => {
        //middlewares pagination - lấy ra 2 giá trị currentPage, skipPage được trả về từ hàm paginationMiddlewares
        const {currentPage, skipPage} = paginationMiddlewares(req, 3) // 3 - pageSize
        Promise.all([
          Course.findWithDeleted({ deleted: true}).skip(skipPage).limit(3).sortable(req),
          Course.countDocuments(),
          Course.countWithDeleted({ deleted: true })
        ])
          .then(([courses, coursesCount, deletedCount]) =>
            res.render("me/trashed-courses", {
              courses: mutipleMongooseToObject(courses),
              coursesCount,
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
