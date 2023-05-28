const db = require('../models')

const directorMessage = async (req, res) => {
    let notice = req.body.notice;
    let info = {
        sender: "director@gmail.com",
        receiver: "admin@gmail.com",
        notice: notice
    }
    let entry = await db.Notice.create(info);
    res.json(entry)
}

const receive = async (req, res) => {
    let receiver = req.params.email;
    let notices = await db.Notice.findAll({
        where: {
            receiver: receiver,
        }
    })
    if(notices){
        res.json(notices)
    }else{
        res.json("No notices");
    }

}

const adminMessage = async (req, res) => {
    let receiverReg = req.body.regNumber;
    let notice = req.body.notice;
    let student = await db.Student.findOne({
        where:{
            regNumber: receiverReg,
        }
    });
    if(student){
        let info = {
            sender: "admin@gmail.com",
            receiver: student.UserEmail,
            notice: notice
        }
        let entry = await db.Notice.create(info);
        res.json(entry);
    }else{
        res.json("No such student");
    }  
}


module.exports = {
    directorMessage,
    receive,
    adminMessage
}
