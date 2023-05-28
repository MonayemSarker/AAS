const db = require('../models')

const notificationStudent = async (req, res) => {

    // console.log(email);
    let students = await db.Student.findAll({
        // where: { UserEmail: email }
    })

    let notifications = [];
    for (const student1 of students) {
        notifications.push(functionbla(student1));
        console.log(student1.dataValues.regNumber)
    }
    res.json(notifications);

}
const functionbla = async (student1) => {
    let notifications = [];
    let student = student1.dataValues;
    let studentCourses = await db.StudentCourse.findAll({
        where: {
            regNumber: student.regNumber,
        }
    })


    //block for consecutive three class miss
    {
        try {

            if (studentCourses.length > 0) {
                let attendances = [];

                for (let i = 0; i < studentCourses.length; i++) {
                    let attendance = await db.Attendance.findAll({
                        where: {

                            StudentCourseId: studentCourses[i].id,
                        },
                        order: [['id', 'DESC'], ['createdAt', 'DESC']],
                        limit: 3
                    })
                    attendances.push(attendance)
                }

                if (attendances.length > 0) {
                    const falseAttendances = attendances.map((attendanceArr, index) => {
                        const allStatusesAreFalse = attendanceArr.every(attendance => attendance.status === false);
                        if (allStatusesAreFalse) {
                            return attendanceArr;
                        }
                        return null;
                    }).filter(Boolean);
                    //     falseAttendances.forEach((attendance, index) => {
                    //     console.log(`Attendance Object ${index + 1}:`, attendance);
                    //   });
                    //console.log(falseAttendances.length);

                    if (falseAttendances.length > 0) {

                        let stuCourseIDs = [];
                        for (let i = 0; i < falseAttendances.length; i++) {
                            // console.log(falseAttendances[i].dataValues);
                            let [firstAttendance] = falseAttendances[i];
                            console.log(firstAttendance);

                            let stuCourse = await db.StudentCourse.findOne({
                                where: {
                                    id: firstAttendance.StudentCourseId,
                                }
                            });
                            //   console.log(stuCourse);
                            let stu = await db.Student.findOne({
                                where: {
                                    regNumber: stuCourse.regNumber,
                                }
                            })

                            let info = {
                                type: `Course Code: ${stuCourse.CourseCourseCode} Three Consequtive Course`,
                                receiver: stu.UserEmail,
                                approval: false
                            }

                            let existingNotification7 = await db.Notification.findOne({
                                where: info
                            });

                            if (!existingNotification7) {
                                let notification = await db.Notification.create(info);
                                notifications.push(notification);
                            }


                            let teacherCourses = await db.TeacherCourse.findAll({
                                where: {
                                    CourseCourseCode: stuCourse.CourseCourseCode,
                                }
                            });


                            if (teacherCourses.length > 0) {
                                let teachers = [];
                                for (let index = 0; index < teacherCourses.length; index++) {
                                    let teacher = await db.Teacher.findOne({
                                        where: {
                                            id: teacherCourses[index].TeacherId,
                                        }
                                    });


                                    if (teacher) {
                                        let info = {
                                            type: `Three Consecutive Miss Course Code: ${stuCourse.CourseCourseCode} , Student: ${stuCourse.regNumber}`,
                                            receiver: teacher.UserEmail,
                                            approval: false
                                        }


                                        let existingNotification6 = await db.Notification.findOne({
                                            where: info
                                        });

                                        if (!existingNotification6) {
                                            let notification = await db.Notification.create(info);
                                            notifications.push(notification);
                                        }
                                    }
                                }
                            }

                            stuCourseIDs.push(stuCourse);

                        }
                        // res.json(notifications);
                    }
                }
            }

        } catch (error) { }
    }

    // block for total below 60% attendance
    {
        try {
            if (studentCourses.length > 0) {
                let attendances = [];

                for (let i = 0; i < studentCourses.length; i++) {
                    let attendance = await db.Attendance.findAll({
                        where: {
                            StudentCourseId: studentCourses[i].id,
                        },
                        order: [['createdAt', 'DESC']],
                    }); console.log(studentCourses[i].id);

                    attendances.push(attendance);

                }

                if (attendances.length > 0) {
                    const statusPercentages = attendances.map((attendanceArr, index) => {
                        const totalEntries = attendanceArr.length;
                        const trueEntries = attendanceArr.filter(attendance => attendance.status === true).length;
                        const statusPercentage = (trueEntries / totalEntries) * 100;
                        //     console.log("tru"+trueEntries);
                        // console.log("tot"+totalEntries);
                        return statusPercentage;
                    });

                    console.log(statusPercentages);
                    //total percentage count

                    let sumP = 0;

                    if (statusPercentages.length > 0) {
                        for (let i = 0; i < statusPercentages.length; i++) {
                            sumP += statusPercentages[i];
                        }
                    }

                    let totalPercentages = sumP / statusPercentages.length;


                    if (totalPercentages < 60) {


                        let info = {
                            type: "Total Attendance Below 60%",
                            receiver: student.UserEmail,
                            approval: false
                        }

                        let existingNotification5 = await db.Notification.findOne({
                            where: info
                        });

                        if (!existingNotification5) {
                            let notification = await db.Notification.create(info);
                            notifications.push(notification);
                        }

                        let info2 = {
                            type: `Attendance Below 60% Student: ${student.regNumber}`,
                            receiver: "admin@gmail.com",
                            approval: false
                        }


                        let existingNotification2 = await db.Notification.findOne({
                            where: info2
                        });

                        if (!existingNotification2) {
                            let notification4 = await db.Notification.create(info2);
                            notifications.push(notification4);
                        }


                        let info3 = {
                            type: `Attendance Below 60% Student: ${student.regNumber}`,
                            receiver: "director@gmail.com",
                            approval: false
                        }


                        let existingNotification1 = await db.Notification.findOne({
                            where: info3
                        });

                        if (!existingNotification1) {
                            let notification5 = await db.Notification.create(info3);
                            notifications.push(notification5);
                        }
                    }







                    //Course wise percentage warning
                    for (let i = 0; i < attendances.length; i++) {
                        let attendanceArr = attendances[i];
                        let stuCourse1 = await db.StudentCourse.findOne({
                            where: {

                                id: attendanceArr[0].StudentCourseId,
                            }
                        })

                        let course = await db.Course.findOne({
                            where: {
                                courseCode: stuCourse1.CourseCourseCode,
                            }
                        })

                        if (statusPercentages[i] < 60) {
                            let info = {
                                type: `${course.courseCode} Percentage Below 60`,
                                receiver: student.UserEmail,
                                approval: false
                            }

                            let existingNotification4 = await db.Notification.findOne({
                                where: info
                            });

                            if (!existingNotification4) {
                                let notification2 = await db.Notification.create(info);
                                notifications.push(notification2);







                            }

                            //////////////////////////
                            let teacherCourses = await db.TeacherCourse.findAll({
                                where: {
                                    CourseCourseCode: stuCourse1.CourseCourseCode,
                                }
                            });


                            if (teacherCourses.length > 0) {
                                let teachers = [];
                                for (let index = 0; index < teacherCourses.length; index++) {
                                    let teacher = await db.Teacher.findOne({
                                        where: {
                                            id: teacherCourses[index].TeacherId,
                                        }
                                    });


                                    if (teacher) {
                                        let info1 = {
                                            type: `Attendance Below 60%: ${stuCourse1.CourseCourseCode} , Student: ${stuCourse1.regNumber}`,
                                            receiver: teacher.UserEmail,
                                            approval: false
                                        }


                                        let existingNotification3 = await db.Notification.findOne({
                                            where: info1
                                        });

                                        if (!existingNotification3) {
                                            let notification3 = await db.Notification.create(info1);
                                            notifications.push(notification3);
                                        }
                                    }
                                }
                            }


                        }
                    }

                }
            }
        } catch (error) { }
    } return notifications;
}



const getNotifications = async (req, res) => {
    let email = req.params.email;

    let notifications = await db.Notification.findAll({
        where: { receiver: email },
        order: [['createdAt', 'DESC']]
    });

    if (notifications) {
        res.json(notifications);
    } else {
        res.json({ message: "No notifications found for the user" });
    }
}

const belowSixty = async (req, res) => {

}

const getApporval = async (req, res) => {
    let id = req.body.id;
    let notification = await db.Notification.findOne({
        where: { id: id }
    });

    if (notification) {
        await db.Notification.destroy({
            where: { id: notification.id }
        });
        res.json("Notification Destroyed");
    } else {
        res.json({ message: "No notifications found" });
    }

}

const getStudentInfo = async (req, res) => {
    let email = req.params.email;
    let student = [];

    let notifications = await db.Notification.findAll(
        {
            where:
            {
                type: "Total Attendance Below 60%"
            }
        }
    );

    for (const element of notifications) {
        const notification = element.dataValues;
        const userEmail = notification.receiver;
        student.push(userEmail);
    }


    res.json(student);
};
module.exports = {

    // consequtiveThreeMissStudent,
    // consequtiveThreeMissTeacher,
    // getNotifications
    notificationStudent,
    getNotifications,
    getApporval,
    getStudentInfo



}
