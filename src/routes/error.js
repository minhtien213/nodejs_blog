var express = require('express')
var router = express.Router()
const errorController = require('../app/controllers/ErrorController')

router.get('/errorAuth', errorController.errorAuth)
router.get('/errorCart', errorController.errorCart)

module.exports = router
