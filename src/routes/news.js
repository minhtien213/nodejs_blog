var express = require('express');
var router = express.Router();
const newsController = require('../app/controllers/NewsController');

router.use('/:slug', newsController.show); //trang con của news
router.use('/', newsController.index); //tuyến đường gốc luôn để dưới cùng

module.exports = router;
