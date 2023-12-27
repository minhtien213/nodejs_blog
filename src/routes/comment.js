var express = require('express')
var router = express.Router()
const commentController = require('../app/controllers/CommentController')

router.post('/:id/create-comment', commentController.create)
router.get('/:id/render-comment', commentController.render)

module.exports = router
