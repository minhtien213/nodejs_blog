// các tuyến đường liên quan đến News thì tạo phương thức ở class này

const Course = require("../models/Course");
const Account = require("../models/Account");
const { mutipleMongooseToObject } = require("../../util/mongoose")
const jwt = require('jsonwebtoken');

class SiteController {

    index(req, res, next) {
      const token = req.cookies.token
      if (token) {
        const result = jwt.verify(token, 'minhtien213');

      Promise.all([Account.findById({_id: result._id}), Course.find({})])
          .then(([account, courses]) => {
            const username = account.username
            res.render('home', {username, courses: mutipleMongooseToObject(courses)})
          })
          .catch(next)
      }else{
        Course.find({})
          .then(courses => res.render('home', {courses: mutipleMongooseToObject(courses)}))
      }
    }

    search(req, res, next) {
        res.render('search');
    }

    error(req, res, next){
      res.render('error')
    }

}

module.exports = new SiteController();
