const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./models')
const bodyParser = require('body-parser');
const fs = require('fs');
const filename = 'barcodes.txt';
const nc = require('./controller/notificationController')
// var corOption = {
//     origin: 'http://localhost:12280'
// }


//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());



const routerStudent = require('./routes/studentRoute.js')
app.use('/student', routerStudent)

const routerTeacher = require('./routes/teacherRoute.js')
app.use('/teacher', routerTeacher);

const routerDirector = require('./routes/directorRoute.js')
app.use('/director', routerDirector);

const routerAdmin = require('./routes/adminRoute.js')
app.use('/admin', routerAdmin);

const routerUser = require('./routes/userRoute.js')
app.use('/user', routerUser);

const routerCourse = require('./routes/courseRoute.js')
app.use('/course', routerCourse);

const routerAttendance = require('./routes/attendanceRoute.js')
app.use('/attendance', routerAttendance);

const routerAuth = require("./routes/authRoute.js");
app.use("/auth", routerAuth);

const routerStudentCourse = require("./routes/studentCourseRoute.js");
app.use("/studentCourse", routerStudentCourse);

const routerTeacherCourse = require("./routes/teacherCourseRoute.js");
app.use("/TeacherCourse", routerTeacherCourse);

const routerNotification = require("./routes/notificationRoute.js");
app.use("/notification", routerNotification);

const routerApproval = require("./routes/approvalRoute.js");
app.use("/approval", routerApproval);

const routerNotice = require("./routes/noticeRoute");
app.use("/notice", routerNotice);

const routerReport = require("./routes/reportRouter");
app.use("/report", routerReport);

app.use(express.static('images'));


app.get('/', (req, res) => {
  res.json({ message: 'hello' });
})


const PORT = process.env.PORT || 12280

db.sequelize.sync(
  { alter: true }
).then(() => {
  app.listen(PORT, () => {
    console.log(`server is running at ${PORT}`)
    // try {

    //   const students =  db.Student.findAll({
    //     attributes: ['UserEmail']
    //   });
    //   const studentEmails = students.map(student => student.UserEmail);
    //   nc.notificationStudent(studentEmails);
    // } catch (error) {
    //   console.error('Error retrieving student emails:', error);
    // }
  })
})

