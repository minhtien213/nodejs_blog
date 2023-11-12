// các tuyến đường liên quan đến News thì tạo phương thức ở class này

const Course = require("../models/Course");
const { mutipleMongooseToObject } = require("../../util/mongoose")

class SiteController {

    index(req, res) {
      res.render('home');
    }

    search(req, res) {
        res.render('search');
    }

    courses(req, res) {
      res.render('courses');
  }


}

module.exports = new SiteController();
