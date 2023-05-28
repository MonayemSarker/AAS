const db = require('../models')

const Admin = db.Admin

//add Teacher
const addAdmin = async (req, res) => {
    let info = {
        name: req.body.name,
        gender: req.body.gender,
        phoneNum: req.body.phoneNum,
        deptName: req.body.deptName,
        currentAddr: req.body.currentAddr,
        permanentAddr: req.body.permanentAddr,
        UserEmail: req.body.UserEmail
    }
    let admin = await db.Admin.create(info);
    res.json(admin);

}



//get Admin
const getAdmin = async (req, res) => {

    let admin = await db.Admin.findOne({
        where: {
            UserEmail: req.params.email
        }
    })
    if (admin) {
        res.json(admin)
    } else {
        res.send({ error: "No Admin with such id" })
    }
}

//update  information
const updateAdmin = async (req, res) => {
    let info = {
        name: req.body.name,
        gender: req.body.gender,
        phoneNum: req.body.phoneNum,
        currentAddr: req.body.currentAddr,
        permanentAddr: req.body.permanentAddr,
    }
    const admin = await db.Admin.findOne({
        where: {
            UserEmail: req.params.email
        }
    })

    if (admin) {
        await db.Admin.update(info, {
            where: {
                UserEmail: req.params.email
            }
        })
        res.send("User info uppdated")
    } else {
        res.send({ error: "User updation failed" })
    }
}

module.exports = {
    addAdmin,getAdmin,updateAdmin

}
