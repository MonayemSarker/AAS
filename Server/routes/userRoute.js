const userController = require('../controller/userController')
const router = require('express').Router()

router.post('/add', userController.addUser);
// router.put('/update', userController.updateUser)
router.delete('/delete', userController.deleteUser)
router.get('/all', userController.getAllUser)
router.get('/one', userController.getOneUser)
router.post('/login', userController.userLogIn)
router.post('/generate-otp', userController.sendOTP)
router.post('/verify-otp', userController.verifyOTP)
router.post('/change-pass', userController.changePassword)
router.post('/generate-otp2', userController.sendOTP2)
router.post('/verify-otp2', userController.verifyOTP2)
router.put('/:email/verifyUser', userController.verifyUser)
router.put('/:email/resetPassword', userController.resetPassword)

module.exports = router