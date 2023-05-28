const courseController = require('../controller/courseController')
const router = require('express').Router()

// router.post('/add', courseController.addCourse);
// router.put('/updateTeacher', courseController.addCourseTeacher)
// router.put('/updateStudent', courseController.addCourseStudent)
// router.put('/attendance', courseController.addCourseAttendance)
router.post('/add', courseController.createCourse);
router.get('/all', courseController.getAllCourses);



module.exports = router