

const moment = require('moment')
const Comment = require("../models/Comment")
const checkPermissionMiddlewares = require('../middlewares/checkPermissionMiddlewares')
const checkUserMiddleware = require('../middlewares/checkUserMiddleware')


class CommentController {

    //[POST] comment/:id/create-comment
    create(req, res, next) {
      checkPermissionMiddlewares(req, res, [0, 1], (account) => {
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

    //[GET] comment/:id/render-comment
    render(req, res, next){
      checkUserMiddleware(req, res)
        .then(() => {
          const productId = req.params.id
          Comment.find({product: productId})
            .populate('account', 'name images')
            .populate('replys.account', 'name images')
              .then((comments) =>{
                res.json(comments)} )
              .catch(next)
        })
    }

    //[DELETE] comment/:id
    delete(req, res, next){
      Comment.deleteOne({_id: req.params.id})
        .then(() => res.redirect('back'))
        .catch(next)
    }

    //[PUT] comment/reply/:id
    reply(req, res, next){
      checkPermissionMiddlewares(req, res, [0, 1], (account) => {
        const commentId = req.params.id
        const replyItem = {
          account: account._id,
          replyContent: req.body.replyContent,
          addedAt: moment().format('DD/MM/YYYY'),
        }
        Comment.findOneAndUpdate({ _id: commentId }, { $push : { replys: replyItem } },)
          .then(() => { res.redirect('back')})
          .catch(next)
      })
    }

    //[DELETE] comment/reply/:id
    deleteReplyCmt(req, res, next) {
      checkPermissionMiddlewares(req, res, [0, 1], (account) => {
        const commentId = req.params.id
        const replyCommentId = req.query.replyCmtId
        Comment.findOneAndUpdate(
          { _id: commentId },
          { $pull: { replys: { _id: replyCommentId } } },
          //{ new: true } // Trả về tài liệu sau khi cập nhật
        )
          .then(() => { res.redirect('back')})
          .catch(next)
      })
    }

}

module.exports = new CommentController()
