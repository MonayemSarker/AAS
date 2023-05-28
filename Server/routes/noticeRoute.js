const noticeController = require('../controller/noticeController')
const router = require('express').Router()

router.post('/director', noticeController.directorMessage);
router.post('/admin', noticeController.adminMessage);
router.get('/:email/get',noticeController.receive);


module.exports = router