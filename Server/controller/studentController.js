const db = require('../models')

const Student = db.Student

const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../images/studentImages'));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }

})

//check image
const isImage = (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
        cb(null, true);
    }
    else {
        cb(null, { error: "Only image" });
    }
}

const upload = multer({
    storage: storage,
    fileFilter: isImage
});

//add student
const addStudent = async (req, res) => {
    let info = {
        name: req.body.name,
        regNumber: req.body.regNumber,
        classRoll: req.body.classRoll,
        gender: req.body.gender,
        sDOB: req.body.sDOB,
        semester: req.body.semester,
        phoneNum: req.body.phoneNum,
        deptName: req.body.deptName,
        batch: req.body.batch,
        currentAddr: req.body.currentAddr,
        permanentAddr: req.body.permanentAddr,
        UserEmail: req.body.UserEmail,
        photo: req.file.filename
    }

    let student = await db.Student.create(info);
    res.json(student);

    // const Student = await Student.create(info);
    // res.status(200).send(Student);
}


// /*
// const updateStudentCourse = async (req, res) => {
//     console.log(req.body)
//     let student = await db.Student.findOne({
//         where: { studentRegNumber: req.body.studentRegNumber }
//     })
//     if (student) {
//         await Student.update({ CourseCourseCode: req.body.courseCode }, { where: { studentRegNumber: req.body.studentRegNumber } })
//         res.send("course code added")
//     } else {
//         res.send({ error: "Student not found" })
//     }
// }

// //get single student
// const getOneStudent = async (req, res) => {

//     let student = await db.Student.findOne({
//         where: {
//             studentRegNumber: req.body.studentRegNumber
//         }
//     })
//     if (student) {
//         res.json(student)
//     } else {
//         res.send({ error: "No Student with such registration number" })
//     }
// }


// //get all students
// const getAllStudents = async (req, res) => {

//     let students = await db.Student.findAll({})
//     res.json(students)
// }
// */

//get all students
const getAllStudents = async (req, res) => {

    let students = await db.Student.findAll({})
    res.json(students)
}

//get single student
const getOneStudent = async (req, res) => {

    let student = await db.Student.findOne({
        where: {
            UserEmail: req.params.email
        }
    })
    if (student) {
        res.json(student)
    } else {
        res.send({ error: "No student with such Registration Number" })
    }
}


//add course to student
const addCourse = async (req, res) => {
    let student = await Student.findByPk(req.params.id)
    if (student) {
        let course = await db.Course.findByPk(req.body.courseCode)
        if (course) {
            await student.addCourse(course)
            res.send("Course added to student")
        } else {
            res.send({ error: "Course not found" })
        }
    } else {
        res.send({ error: "Student not found" })
    }
}

//get student's courses
const getStudentCourses = async (req, res) => {
    let student = await Student.findByPk(req.params.id)
    if (student) {
        let courses = await student.getCourses()
        res.json(courses)
    } else {
        res.send({ error: "Student not found" })
    }
}

//update Student information
const updateStudent = async (req, res) => {
    let info = {
        name: req.body.name,
        gender: req.body.gender,
        sDOB: req.body.sDOB,
        phoneNum: req.body.phoneNum,
        currentAddr: req.body.currentAddr,
        permanentAddr: req.body.permanentAddr,
        // photo: req.file.filename
    }
    const student = await db.Student.findOne({
        where: {
            UserEmail: req.params.email
        }
    })

    if (student) {
        await db.Student.update(info, {
            where: {
                UserEmail: req.params.email
            }
        })
        res.send("Student info uppdated")
    } else {
        res.send({ error: "Student updation failed" })
    }
}

module.exports = {
    addStudent,
    addCourse,
    getOneStudent,
    getAllStudents,
    getStudentCourses,
    upload,
    updateStudent
}