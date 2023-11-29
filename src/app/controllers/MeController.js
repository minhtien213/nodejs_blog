
const Course = require("../models/Course");
const { mutipleMongooseToObject } = require("../../util/mongoose")

class meController {

    // [GET] /me/stored/courses
    storedCourses(req, res, next) {
      Promise.all([
        Course.find({}).sortable(req),
        Course.countWithDeleted({ deleted: true })
      ])
        .then(([courses, deletedCount]) =>
          res.render("me/stored-courses", {
            courses: mutipleMongooseToObject(courses),
            deletedCount,
          })
        )
        .catch(next);
    }

    // [GET] /me/trash/courses
    trashCourses(req, res, next) {
        Promise.all([
          Course.findWithDeleted({ deleted: true}).sortable(req),
          Course.countDocuments()
        ])
          .then(([courses, coursesCount]) =>
            res.render("me/trashed-courses", {
              courses: mutipleMongooseToObject(courses),
              coursesCount,
            })
          )
          .catch(next);
    }
}

module.exports = new meController();
