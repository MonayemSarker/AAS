const attendanceController = require('../controller/attendanceController')
const router = require('express').Router()

router.post('/start', attendanceController.startAttendance);
router.put('/manualCount', attendanceController.manualAttendance);
router.put('/scanCount', attendanceController.scannerAttendance);
router.get('/getStudent', attendanceController.getStudent);
router.put('/edit', attendanceController.editAttendance);




module.exports = router