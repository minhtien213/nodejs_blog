var express = require('express');
var router = express.Router();
const siteController = require('../app/controllers/SiteController');

router.use('/timkiem', siteController.search); //trang search
router.use('/', siteController.index); //tuyến đường gốc luôn để dưới cùng(trang home)

module.exports = router;
