const notificationeController = require('../controller/notificationController')
const router = require('express').Router()

router.post('/post', notificationeController.notificationStudent);
router.get('/:email', notificationeController.getNotifications);
router.delete('/approve', notificationeController.getApporval);
router.get('/:email/info', notificationeController.getStudentInfo);

module.exports = router