

const moment = require('moment')
const Product = require("../models/Product")
const Account = require("../models/Account")
const Comment = require("../models/Comment")
const { mutipleMongooseToObject, mongooseToObject } = require("../../util/mongoose")
const checkLoginMiddlewares = require('../middlewares/checkLoginMiddlewares')
const checkUser = require('../middlewares/checkUser')


class CommentController {

    //[POST] /:id/create-comment
    create(req, res, next) {
      checkLoginMiddlewares(req, res, [0, 1], (account) => {
        const productId = req.params.id
        const accountId  = account._id
        const comment = new Comment({
          product: productId,
          account: accountId,
          content: req.body.content,
          addedAt: moment().format('DD/MM/YYYY'),
        })
        comment.save()
          .then(() => res.redirect('back'))
          .catch(next)
      })
    }

    //[GET] /:id/render-comment
    render(req, res, next){
      checkUser(req, res)
        .then((account) => {
          const productId = req.params.id
          Comment.find({product: productId}).populate('account', 'name images')
            .then((comments) =>{
              res.json(comments)} )
            .catch(next)
        })
    }

    //[DELETE] /:id
    delete(req, res, next){
      Comment.delete({_id: req.params.id})
        .then(() => res.redirect('back'))
        .catch(next)
    }
}

module.exports = new CommentController()
