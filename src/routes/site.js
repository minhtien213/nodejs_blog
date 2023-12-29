var express = require('express')
var router = express.Router()
const siteController = require('../app/controllers/SiteController')

router.get('/search', siteController.search)
router.get('/my-account', siteController.myAccount)
router.put('/my-account', siteController.myAccountUpdate)
router.get('/search-results', siteController.searchResutls)
router.get('/', siteController.index) //tuyến đường gốc luôn để dưới cùng(trang home)   

module.exports = router
