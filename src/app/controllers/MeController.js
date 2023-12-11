
const Course = require("../models/Course");
const { mutipleMongooseToObject } = require("../../util/mongoose")
const paginationMiddlewares = require('../middlewares/paginationMiddlewares')
const checkLoginMiddlewares = require('../middlewares/checkLoginMiddlewares')

class meController {

    // [GET] /me/stored/courses
    storedCourses(req, res, next) {

      checkLoginMiddlewares(req, res, [0], (username) => { //truyền array roles - callback thay cho next()
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
              totalPage: Math.ceil(coursesCount / 3),
              deletedCount,
              currentPage,
              username
            })
          )
          .catch(next);
        });
    }
    

    // [GET] /me/trash/courses
    trashCourses(req, res, next) {

      checkLoginMiddlewares(req, res, [0], (username) => {
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
              totalPage: Math.ceil(deletedCount / 3),
              currentPage,
              username
            })
          )
          .catch(next)
      })
    }
}

module.exports = new meController();
