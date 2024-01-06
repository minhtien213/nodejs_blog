var express = require('express')
var router = express.Router()
const commentController = require('../app/controllers/CommentController')

router.post('/:id/create-comment', commentController.create)
router.delete('/:id', commentController.delete)
router.get('/:id/render-comment', commentController.render)
router.delete('/reply/:id', commentController.deleteReplyCmt)
router.put('/reply/:id', commentController.reply)

module.exports = router
