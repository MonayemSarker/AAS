const db = require('../models')
const PDFDocument = require('pdfkit');

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


const generatePDF_Report = () => {
    return new Promise(async (resolve, reject) => {
        const today = new Date();
        const students = await db.Student.findAll();


        const doc = new PDFDocument()
        doc.info.Title = 'Semester End Report';

        for (const student of students) {
            let reports = await db.Report.findAll({
                where: {
                    regNumber: student.regNumber,
                }
            });

            let countCourse = reports.length;

            const totalPercentage = (reports.reduce((sum, report) => sum + report.percentage, 0)) / countCourse;

            doc.fillColor('black');
            doc.fontSize(16).text('Name                         :  ' + student.name, { align: 'left' });
            doc.moveDown();

            doc.fontSize(16).text('Registration Number :  ' + student.regNumber, { align: 'left' });
            doc.moveDown();

            doc.fontSize(16).text('Class Roll                  :  ' + student.classRoll, { align: 'left' });
            doc.moveDown();

            doc.fontSize(16).text('Semester                   :  ' + student.semester, { align: 'left' });
            doc.moveDown();




            doc.moveDown();
            doc.moveDown();
            doc.moveDown();
            doc.moveDown();

            doc.fillColor('blue').fontSize(16).text(('Statistics'),
                { align: 'center' });
            doc.moveDown();
            doc.moveDown();

            doc.fillColor('black');
            doc.fontSize(16).text(('Course Reports:'));
            doc.moveDown();

            doc.fontSize(16);
            doc.font('Times-Bold').text(`Course Code`, {
                align: 'left', continued: true
            });

            doc.font('Times-Bold').text(`Percentage`, {
                align: 'center', continued: false
            });

            doc.moveDown();

            for (const report of reports) {
                doc.fontSize(14);
                doc.font('Times-Roman').text(`${report.courseCode}`,
                    { align: 'left', continued: true });
                doc.font('Times-Roman').text(`${report.percentage}`,
                    { align: 'center', continued: false });

            }
            doc.moveDown();
            doc.moveDown();

            doc.fontSize(16).text(('Total Attendance Percentage: ' + totalPercentage));

            doc.moveDown();
            doc.moveDown();

            if (totalPercentage < 60) {
                doc.fillColor('red').fontSize(14).text(`Not eligible for final exam`,
                    { align: 'center' });
            } else {
                doc.fillColor('green').fontSize(14).text(`Eligible for final exam`,
                    { align: 'center' });
            }

            doc.moveDown();
            doc.addPage();
        }

        doc.end();

        const buffers = [];
        doc.on('data', buffer => buffers.push(buffer));
        doc.on('end', () => resolve(Buffer.concat(buffers)));
        doc.on('error', reject);

    })
}

const getReport = async (req, res) => {
    await generatePDF_Report(req, res)
        .then(pdf => {
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', 'attachment; filename=Final Report.pdf');
            res.send(pdf);
        })
        .catch(error => {
            console.error(error);
            res.status(500).send('PDF generation failed');
        })
}

module.exports = {
    createReport,
    updateReports,
    getReportsStudent,
    getReportsTeacher,
    getReport
}

