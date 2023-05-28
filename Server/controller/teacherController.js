const db = require('../models')

const Teacher = db.Teacher







//add Teacher
const addTeacher = async (req, res) => {
    let info = {
        name: req.body.name,
        gender: req.body.gender,
        phoneNum: req.body.phoneNum,
        deptName: req.body.deptName,
        currentAddr: req.body.currentAddr,
        permanentAddr: req.body.permanentAddr,
        UserEmail: req.body.UserEmail,
    }
    let teacher = await db.Teacher.create(info);
    res.json(teacher);

}

//get all teachers
const getAllTeachers = async (req, res) => {

    let teachers = await db.Teacher.findAll({})
    res.json(teachers)
}

//get single teachers
const getOneTeacher = async (req, res) => {

    let teacher = await db.Teacher.findOne({
        where: {
            UserEmail: req.params.email
        }
    })
    if (teacher) {
        res.json(teacher)
    } else {
        res.send({ error: "No Teacher with such id" })
    }
}


//get teacher Id
const getTeacherID = async (req, res) => {

    let teacher = await db.Teacher.findOne({
        where: {
            email: req.body.email
        }
    })
    if (teacher) {
        res.json(teacher)
    } else {
        res.send({ error: "No Teacher with such id" })
    }
}




//updateCourseCodes
// const updateTeacherCourse = async (req, res) => {
//     // console.log(req.body)
//     let teacher = await db.Teacher.findOne({
//         where: { id: req.body.id }
//     })
//     if (teacher) {
//         await Teacher.update({ CourseCourseCode: req.body.courseCode }, { where: { id: req.body.id } })
//         res.send("course code added")
//     } else {
//         res.send({ error: "teacher not found" })
//     }
// }

//add course to teacher
const addCourse = async (req, res) => {
    let teacher = await Teacher.findByPk(req.params.id)
    if (teacher) {
        let course = await db.Course.findByPk(req.body.courseCode)
        if (course) {
            await teacher.addCourse(course)
            res.send("Course added to teacher")
        } else {
            res.send({ error: "Course not found" })
        }
    } else {
        res.send({ error: "Teacher not found" })
    }
}

//get teacher's courses
const getTeacherCourses = async (req, res) => {
    let teacher = await Teacher.findByPk(req.params.id)
    if (teacher) {
        let courses = await teacher.getCourses()
        res.json(courses)
    } else {
        res.send({ error: "Teacher not found" })
    }
}


//update  information
const updateTeacher = async (req, res) => {
    let info = {
        name: req.body.name,
        gender: req.body.gender,
        phoneNum: req.body.phoneNum,
        currentAddr: req.body.currentAddr,
        permanentAddr: req.body.permanentAddr,
        // photo: req.file.filename
    }
    const teacher = await db.Teacher.findOne({
        where: {
            UserEmail: req.params.email
        }
    })

    if (teacher) {
        await db.Teacher.update(info, {
            where: {
                UserEmail: req.params.email
            }
        })
        res.send("User info uppdated")
    } else {
        res.send({ error: "User updation failed" })
    }
}

module.exports = {
    addTeacher,
    getAllTeachers,
    getOneTeacher,
    addCourse,
    getTeacherCourses,
    updateTeacher

}
