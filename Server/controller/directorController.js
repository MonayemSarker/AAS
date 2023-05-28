const db = require('../models')

const Director = db.Director

//add Teacher
const addDirector = async (req, res) => {
    let info = {
        name: req.body.name,
        gender: req.body.gender,
        phoneNum: req.body.phoneNum,
        deptName: req.body.deptName,
        currentAddr: req.body.currentAddr,
        permanentAddr: req.body.permanentAddr,
        UserEmail: req.body.UserEmail
    }
    let director = await db.Director.create(info);
    res.json(director);

}



//get Director
const getDirector = async (req, res) => {

    let director = await db.Director.findOne({
        where: {
            UserEmail: req.params.email
        }
    })
    if (director) {
        res.json(director)
    } else {
        res.send({ error: "No Director with such id" })
    }
}


//update  information
const updateDirector = async (req, res) => {
    let info = {
        name: req.body.name,
        gender: req.body.gender,
        phoneNum: req.body.phoneNum,
        currentAddr: req.body.currentAddr,
        permanentAddr: req.body.permanentAddr
    }
    const director = await db.Director.findOne({
        where: {
            UserEmail: req.params.email
        }
    })

    if (director) {
        await db.Director.update(info, {
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
    addDirector,
    getDirector,
    updateDirector

}
