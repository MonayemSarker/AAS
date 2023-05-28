const studentController = require('../controller/studentController')
const router = require('express').Router()

router.post('/add', studentController.upload.single('photo'), studentController.addStudent);
router.put('/:id/course', studentController.addCourse)
router.get('/all', studentController.getAllStudents)
router.get('/:email', studentController.getOneStudent)
router.get('/courses/:id', studentController.getStudentCourses)
router.put('/:email', studentController.updateStudent)



module.exports = router