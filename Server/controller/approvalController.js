const db = require('../models')



// const getStudentInfo = async(req, res)=>{
//     let email = req.params.email;
//     // let student =[];
//     let approvals = [];
//     let notifications = await db.Notification.findAll(
//         {
//             where: 
//             {
//                 type: "Total Attendance Below 60%"
//             }
//         }
//     );
   
//     for (const element of notifications) {
//         const notification = element.dataValues;
//         const userEmail = notification.receiver;
//         let stu = await db.Student.findOne({
//             where:{
//                 UserEmail: userEmail
//             }
//         })

//         let info={
//             regNumber:stu.regNumber,
//         }
//         let approveData = await db.Approval.create(info);
//         approvals.push(approveData)

//         // student.push(stu);
//     }
    

   
// }

const getAllInfo= async (req, res)=>{

    let email = req.params.email;
    // let student =[];
    // let approvals = [];
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
        let stu = await db.Student.findOne({
            where:{
                UserEmail: userEmail
            }
        })

        let info={
            regNumber:stu.regNumber,
        }
        let exist = await db.Approval.findOne({
            where: {
                regNumber: stu.regNumber,
            }
        })
        if(!exist){

            let approveData = await db.Approval.create(info);
        }
        // approvals.push(approveData)

        // student.push(stu);
    }
    let approvals = await db.Approval.findAll();
    res.json(approvals);

}

const approve = async(req, res)=>{
    let regNum = req.body.regNumber;
    let info ={
        approveStatus: true
    }
    let approveData = await db.Approval.update(info,{
        where: {
            regNumber: regNum,
        }
    })

    if(approveData){
        res.json(approveData)
    }else{
        res.json({error : "Student Not Found"})
    }
}

module.exports = {
   getAllInfo,approve

}
