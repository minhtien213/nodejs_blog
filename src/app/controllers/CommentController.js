
const Course = require("../models/Course")
const Account = require("../models/Account")
const Comment = require("../models/Comment")
const { mutipleMongooseToObject, mongooseToObject } = require("../../util/mongoose")
const checkLoginMiddlewares = require('../middlewares/checkLoginMiddlewares')


class CommentController {

    //[POST] /:id/create-comment
    create(req, res, next) {
      checkLoginMiddlewares(req, res, [0, 1], (account) => {
        const courseId = req.params.id
        const accountId  = account._id
        const comment = new Comment({
          course: courseId,
          account: accountId,
          content: req.body.content,
        })
        comment.save()
          .then(() => res.redirect('back'))
          .catch(next)
      })
    }

    //[GET] /:id/render-comment
    render(req, res, next){
      checkLoginMiddlewares(req, res, [0, 1], (account) => {
        const courseId = req.params.id
        const accountId  = account._id
        Comment.find({course: courseId}).populate('account')
          .then((comments) => res.json(comments))
          .catch(next)
      })
    }
}

module.exports = new CommentController()
