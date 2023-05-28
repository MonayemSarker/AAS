const db = require('../models')

const Attendance = db.Attendance

//teacher course code add korar sathe sathe ei function call hbe
const startAttendance = async (req, res) => {
    let code = req.body.courseCode1;

    let course = await db.Course.findOne({
        where: { courseCode: code },
    })

    if (course) {
        let studentCourseIds = await db.StudentCourse.findAll({
            where: { CourseCourseCode: code },
        })

        if (studentCourseIds.length > 0) {
            let studentCoursesData = [];

            for (let i = 0; i < studentCourseIds.length; i++) {
                let data = studentCourseIds[i];

                let info = {
                    StudentCourseId: data.id,
                    status: false,
                }

                let studentCourse = await db.Attendance.create(info);
                studentCoursesData.push(studentCourse);

            }
            res.json(studentCoursesData);
        } else {
            res.json({ error: "No student with such course" });
        }
    } else {
        res.json({ error: "No Such course exits" });
    }
}

//register manual attendance
const manualAttendance = async (req, res) => {
    let code = req.body.courseCode1;
    let course = await db.Course.findOne({
        where: { courseCode: code },
    })
    let regNumber = req.body.regNumber;
    let student = await db.Student.findOne({
        where: { regNumber: regNumber },
    })

    if (course && student) {
        let studentCourseId = await db.StudentCourse.findOne({
            where: {
                CourseCourseCode: code,
                regNumber: regNumber,
            },
        })
        // console.log(studentCourseId);
        if (studentCourseId) {

            //two formats for date matching. lets which works!!

            const currentDate = new Date();

            const year = currentDate.getFullYear();
            const month = String(currentDate.getMonth() + 1).padStart(2, '0');
            const day = String(currentDate.getDate()).padStart(2, '0');

            const formattedDate = `${year}-${month}-${day}`;
            console.log(formattedDate);

            // const currentDate = new Date();
            // currentDate.setHours(0, 0, 0, 0);
            // const formattedDate = currentDate.toISOString().split('T')[0];

            let info = {
                status: 1,
            }

            let countAttendance = await db.Attendance.update(info, {
                where: {
                    createdAt: formattedDate, //genjam ekta hobe eikhane sure
                    StudentCourseId: studentCourseId.id,
                }
            })

            res.json(countAttendance);
        } else {
            res.json({ error: "Student not enrolled in the course" });
        }

    } else {
        res.json({ error: "Invalid course or student" });
    }
}

//eta direct call hobe, barcode er alada kono post drkr nai, etay barcode pathay dibo?
const scannerAttendance = async (req, res) => {

    //accha ekhane ghotona hoilo, ei page e to course code thakbe na, but course code tao pathano lagbe,
    let code = req.body.courseCode1;
    let course = await db.Course.findOne({
        where: { courseCode: code },
    })

    //function duitai same but, ekhane regNumber ta barcode theke ashbe!eta kmne ana jae vaba lagbe!
    let regNumber = req.body.barcode;
    let student = await db.Student.findOne({
        where: { regNumber: regNumber },
    })


    if (course && student) {
        let studentCourseId = await db.StudentCourse.findOne({
            where: {
                CourseCourseCode: code,
                regNumber: regNumber,
            },
        })

        if (studentCourseId) {

            //two formats for date matching. lets which works!!

            const currentDate = new Date();

            const year = currentDate.getFullYear();
            const month = String(currentDate.getMonth() + 1).padStart(2, '0');
            const day = String(currentDate.getDate()).padStart(2, '0');

            const formattedDate = `${year}-${month}-${day}`;


            // const currentDate = new Date();
            // currentDate.setHours(0, 0, 0, 0);
            // const formattedDate = currentDate.toISOString().split('T')[0];

            let info = {
                status: true,
            }

            let countAttendance = await db.Attendance.update(info, {
                where: {
                    createdAt: formattedDate, //genjam ekta hobe eikhane sure
                    StudentCourseId: studentCourseId.id,
                }
            })

            res.json(countAttendance);
        } else {
            res.json({ error: "Student not enrolled in the course" });
        }

    } else {
        res.json({ error: "Invalid course or student" });
    }

}
const getStudent = async (req, res) => {
    let code = req.query.courseCode1;
    console.log(code);
    let course = await db.Course.findOne({
        where: { courseCode: code },
    })

    if (course) {
        let studentCourseIds = await db.StudentCourse.findAll({
            where: { CourseCourseCode: code },
        })

        if (studentCourseIds) {
            res.json(studentCourseIds);
        } else {
            res.json({ error: "No student with such course" });
        }
    } else {
        res.json({ error: "No Such course exits" });
    }
}

const editAttendance = async (req, res) => {

    let code = req.body.courseCodeEdit;
    let reg = req.body.regNumberEdit;
    let date = req.body.dateEdit;
    let status = req.body.statusEdit;

    let course = await db.Course.findOne({
        where: { courseCode: code },
    })

    let student = await db.Student.findOne({
        where: { regNumber: reg },
    })

    if (student && course) {

        let studentCourseId = await db.StudentCourse.findOne({
            where: {
                CourseCourseCode: code,
                regNumber: reg,
            },
        })

        let info = {
            status: status,
        }

        let attendance = await db.Attendance.update(info, {
            where: {
                StudentCourseId: studentCourseId.id,
                createdAt: date,
            }
        })

        res.json(attendance);

    } else {
        res.json({ error: "Invalid course or student" });
    }

}
module.exports = {
    startAttendance,
    manualAttendance,
    scannerAttendance,
    getStudent,
    editAttendance

}
