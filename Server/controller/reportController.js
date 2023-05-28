const db = require('../models')

const createReport = async (req, res) => {
    let reports = []
    let studentCourses = await db.StudentCourse.findAll();
    for (const studentCourse of studentCourses) {
        let attendances = await db.Attendance.findAll({
            where: {
                StudentCourseId: studentCourse.id,
            }
        });
        try {
            // console.log("hi1");
            let totalEntries = attendances.length;
            // console.log(totalEntries);
            let trueEntries = attendances.filter(attendance => attendance.status === true).length;
            // console.log(trueEntries);
            let percetage = (trueEntries / totalEntries) * 100
            // console.log(percetage);

            let info = {
                courseCode: studentCourse.CourseCourseCode,
                regNumber: studentCourse.regNumber,
                percentage: percetage,
            }

            console.log(info);

            let existInfo = {
                courseCode: studentCourse.CourseCourseCode,
                regNumber: studentCourse.regNumber,
            }

            let exist = await db.Report.findOne({
                where: existInfo
            })

            if (!exist) {
                let report = await db.Report.create(info);
                reports.push(report);
                // console.log("hi3");
            }
            // console.log("hi2");
        }
        catch { }
    }
    res.json(reports);
}

const updateReports = async (req, res) => {
    let reports = []
    let studentCourses = await db.StudentCourse.findAll();
    for (const studentCourse of studentCourses) {
        let attendances = await db.Attendance.findAll({
            where: {
                StudentCourseId: studentCourse.id,
            }
        });
        try {
            // console.log("hi1");
            let totalEntries = attendances.length;
            // console.log(totalEntries);
            let trueEntries = attendances.filter(attendance => attendance.status === true).length;
            // console.log(trueEntries);
            let percetage = (trueEntries / totalEntries) * 100
            // console.log(percetage);

            let info = {
                courseCode: studentCourse.CourseCourseCode,
                regNumber: studentCourse.regNumber,
                percentage: percetage,
            }

            // console.log(info);

            let existInfo = {
                courseCode: studentCourse.CourseCourseCode,
                regNumber: studentCourse.regNumber,
            }

            let exist = await db.Report.findOne({
                where: existInfo
            })

            // console.log(exist);

            if (exist) {
                let report = await db.Report.update(info, {
                    where: existInfo
                });
                reports.push(report);
                console.log("hi3");
            }
            // console.log("hi2");
        }
        catch { }
    }
    res.json(reports);
}

const getReportsStudent = async (req, res) => {
    let email = req.params.email;
    let student = await db.Student.findOne({
        where: {
            UserEmail: email,
        }
    });


    let reports = await db.Report.findAll({
        where: {
            regNumber: student.regNumber,
        }
    })

    res.json(reports)
}

const getReportsTeacher = async (req, res) => {
    let email = req.params.email;
    let Teacher = await db.Teacher.findOne({
        where: {
            UserEmail: email,
        }
    });


    let courses = await db.TeacherCourse.findAll({
        where: {
            TeacherId: Teacher.id,
        }
    })

    console.log(courses);

    let reports = [];
    for (const course of courses) {

        let report = await db.Report.findAll({
            where: {
                courseCode: course.CourseCourseCode,
            }
        })
        reports.push(report)
    }

    res.json(reports)
}

module.exports = {
    createReport,
    updateReports,
    getReportsStudent,
    getReportsTeacher
}

