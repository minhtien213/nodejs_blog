var express = require('express');
var router = express.Router();
const authController = require('../app/controllers/AuthController');

router.get('/login', authController.login); //trang login 
router.post('/login', authController.loginHandle)
router.get('/logout', authController.logoutHandle)
router.get('/register', authController.register); //trang register 
router.post('/register', authController.registerHandle); //trang register 

module.exports = router;
