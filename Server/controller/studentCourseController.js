const db = require('../models')

const StudentCourse = db.StudentCourse


//call this function when any course has been added
const createCourseRelation = async (req, res) => {
    let code = req.body.courseCode;
    let semester = req.body.semester;
  
    let students = await db.Student.findAll({
      where: { semester: semester }
    });
  
    if (students.length > 0) {
      let studentCourses = [];
  
      for (let i = 0; i < students.length; i++) {
        let student = students[i];
  
        let info = {
          CourseCourseCode: code,
          regNumber: student.regNumber,
        }
  
        let studentCourse = await db.StudentCourse.create(info);
        studentCourses.push(studentCourse);
      }
  
      res.json(studentCourses);
    } else {
      res.json({ error: "No student with such Registration Number" });
    }
  };
  
// const createCourseRelation = async (req, res) => {
//     let code = req.body.courseCode;
//     let semester = req.body.semester;

//     let students = await db.Student.findAll({
//         where: { semester: semester }
//     })

//     if (students) {
//         students.forEach(student => {
//             let info = {
//                 CourseCourseCode: code,
//                 regNumber: student.regNumber,
//             }

//             let studentCourse = db.StudentCourse.create(info);
//             res.json(studentCourse);
//         })
//     } else {
//         req.json({ error: "No student with such Registration Number" })
//     }
// }

//user
//student
//createStudentRelationship

//call this function when any student has been added
// const createStudentRelation = async (req, res) => {
//     let email = req.body.email;

//     let student = await db.Student.findOne({
//         where: { UserEmail: email }
//     })

//     if (student) {
//         let semester = student.semester;

//         let courses = await db.Course.findAll({
//             where: { semester: semester }
//         })

//         courses.forEach(course => {
//             let info = {
//                 CourseCourseCode: course.courseCode,
//                 regNumber: student.regNumber,
//             }

//             let studentCourse = db.StudentCourse.create(info);
//             res.json(studentCourse);
//         })
//     } else {
//         req.json({ error: "No student with such Registration Number" })
//     }
// }
const createStudentRelation = async (req, res) => {
    let email = req.body.email;
  
    let student = await db.Student.findOne({
      where: { UserEmail: email }
    });
  
    if (student) {
      let semester = student.semester;
  
      let courses = await db.Course.findAll({
        where: { semester: semester }
      });
  
      let studentCourses = [];
  
      for (let i = 0; i < courses.length; i++) {
        let course = courses[i];
  
        let info = {
          CourseCourseCode: course.courseCode,
          regNumber: student.regNumber,
        }
  
        let studentCourse = await db.StudentCourse.create(info);
        studentCourses.push(studentCourse);
      }
  
      res.json(studentCourses);
    } else {
      res.json({ error: "No student with such Registration Number" });
    }
  };
  



module.exports = {
    createCourseRelation, createStudentRelation


}
