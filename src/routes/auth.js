var express = require('express')
var router = express.Router()
const authController = require('../app/controllers/AuthController')

router.get('/login', authController.login)
router.post('/login', authController.loginHandle)
router.get('/logout', authController.logoutHandle)
router.get('/register', authController.register) 
router.post('/register', authController.registerHandle) 
router.get('/reset-password', authController.resetPassword) 
router.put('/reset-password', authController.resetPasswordHandle) 

module.exports = router
