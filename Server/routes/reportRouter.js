const reportController = require('../controller/reportController')
const router = require('express').Router()

router.post('/generate', reportController.createReport);
router.put('/update', reportController.updateReports);
router.get('/:email/student', reportController.getReportsStudent);
router.get('/:email/teacher', reportController.getReportsTeacher);
router.get('/get', reportController.getReport);



module.exports = router