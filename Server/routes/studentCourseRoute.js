const studentCourseController = require('../controller/studentCourseController')
const router = require('express').Router()

router.post('/student', studentCourseController.createStudentRelation)
router.post('/course', studentCourseController.createCourseRelation)



module.exports = router