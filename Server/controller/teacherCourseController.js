const db = require('../models')


// const teacherCourse = db.StudentCourse
//adding teacher and courses
const addTeacherCourse = async (req, res) => {
    const code = req.body.courseCode1;
    const email = req.body.teacherEmail;

    let teacher = await db.Teacher.findOne({
        where: { UserEmail: email }
    })

    let course = await db.Course.findOne({
        where: { courseCode: code }
    })

    if (teacher && course) {
        let info = {
            TeacherId: teacher.id,
            CourseCourseCode: course.courseCode
        }

        let teacherCourse = await db.TeacherCourse.create(info);
        res.json(teacherCourse);


    } else {
        res.json({ error: "Teacher or Course invalid" });
    }
}

module.exports = {
    addTeacherCourse
}
