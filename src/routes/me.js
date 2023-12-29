var express = require('express');
var router = express.Router();
const meController = require('../app/controllers/MeController');

router.get('/stored/products', meController.storedProducts)
router.get('/trash/products', meController.trashProducts)

module.exports = router;
