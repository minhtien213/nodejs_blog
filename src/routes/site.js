var express = require('express');
var router = express.Router();
const siteController = require('../app/controllers/SiteController');

router.get('/timkiem', siteController.search); //trang search
// router.get('/', siteController.index); //tuyến đường gốc luôn để dưới cùng(trang home)   

module.exports = router;
