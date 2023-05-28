const teacherController = require('../controller/teacherController')
const router = require('express').Router()


router.post('/add', teacherController.addTeacher);
router.put('/:id/course', teacherController.addCourse)
router.get('/all', teacherController.getAllTeachers)
router.get('/:email', teacherController.getOneTeacher)
router.get('/courses/:id', teacherController.getTeacherCourses)
router.put('/:email', teacherController.updateTeacher)

module.exports = router