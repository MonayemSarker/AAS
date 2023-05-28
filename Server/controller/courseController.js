const db = require('../models')

const Course = db.Course



const createCourse = async (req, res) => {
    let info = {
        courseName: req.body.courseName,
        courseCode: req.body.courseCode,
        semester: req.body.semester,
    }
    await db.Course.create(info);
    res.json(info);

}

const getAllCourses = async (req, res) => {
    let courses = await db.Course.findAll();
    res.json(courses);
}

module.exports = {

    createCourse, getAllCourses

}
