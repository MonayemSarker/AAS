const teacherCourseController = require('../controller/teacherCourseController');
const router = require('express').Router()

router.post('/add', teacherCourseController.addTeacherCourse);


module.exports = router