const bcrypt = require("bcrypt");
const db = require('../models')
const { sign } = require("jsonwebtoken")
const otpGenerator = require('otp-generator');
const nodemailer = require('nodemailer');
const otpMap = new Map();

const User = db.User

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'automatedattendancesystem2228@gmail.com',
        pass: 'kbseerqqwoimypky',
    },
});



//add User
const addUser = async (req, res) => {
    const user1 = await db.User.findOne({
        where: { email: req.body.email },
    })

    if (user1) {
        res.json("Duplicate")
    }
    else {

        bcrypt.hash(req.body.password, 10).then((hash) => {

            let info = {
                email: req.body.email,
                phone: req.body.phone,
                password: hash,
                userType: req.body.userType,
                verificationStatus: req.body.verificationStatus
            }

            let user = db.User.create(info);
            res.json(user);

        })



    }

}

//updateUser

// const updateUser = async (req, res) => {
//     let info = {
//         email: req.body.email,
//         phone: req.body.phone,
//         password: req.body.password,
//         userType: req.body.userType,
//         verificationStatus: req.body.verificationStatus
//     }
//     const user = await db.User.findOne({
//         where: { id: req.body.id }
//     })

//     if (user) {
//         await db.User.update(info, { where: { id: req.body.id } })
//         res.send("User info uppdated")
//     } else {
//         res.send({ error: "User updation failed" })
//     }
// }


//delete user
const deleteUser = async (req, res) => {
    const emailRemoved = req.body.emailRemoved;
    // console.log(req.body.emailRemoved);
    const user = await db.User.findOne({ where: { email: emailRemoved }, include: [db.Teacher, db.Student] });
    if (user) {
        // delete associated records
        if (user.Teacher) {
            await user.Teacher.destroy()
        }
        if (user.Student) {
            await user.Student.destroy()
        }

        // delete user record

        await db.User.destroy({ where: { email: emailRemoved } })

        res.send("User deleted successfully")
    } else {
        res.send({ error: "User deletion failed" })
    }
}


//get all users
// const getAllUser = async (req, res) => {
//     const users = await db.User.findAll({
//         // include: [db.Teacher, db.Student]
//     })
//     let data = {
//         email: users.email,
//         phone: users.phone,
//         userType: users.userType,
//     }
//     // res.json(users)
//     res.json(data)
// }

//new get all users
const getAllUser = async (req, res) => {
    const users = await db.User.findAll();
    const userData = users.map(user => ({
        email: user.email,
        phone: user.phone,
        userType: user.userType,
        verificationStatus: user.verificationStatus
    }));
    res.json(userData);
};



//get one user
const getOneUser = async (req, res) => {
    const user = await db.User.findOne({
        where: { id: req.body.id },
        include: [db.Teacher, db.Student]
    })

    if (user) {
        res.json(user)
    } else {
        res.send({ error: "User not found" })
    }
}

const verifyUser = async (req, res) => {
    let info = {
        verificationStatus: req.body.verificationStatus
    }

    const user = await db.User.findOne({
        where: { email: req.params.email },
    })

    if (user) {
        await db.User.update(info, {
            where: {
                email: req.params.email
            }
        })
        res.send("Verification status uppdated")
    } else {
        res.send({ error: "Verification failed" })
    }
}


//tried something
// if (user.userType == 'Teacher') {
//     let teacher = await db.Teacher.findOne({
//         where: { UserEmail: user.email }
//     })
//     res.json(teacher)
// }

//user login
const userLogIn = async (req, res) => {
    const { email, password } = req.body;
    const user = await db.User.findOne({ where: { email: email } });
    if (user) {
        bcrypt.compare(password, user.password).then((match) => {
            if (match) {
                const accessToken = sign({
                    email: user.email,
                    userType: user.userType,
                    verificationStatus: user.verificationStatus
                }, "tokenTry");
                res.json(accessToken);
            } else {
                res.json({ error: "Wrong email or password" })
            }
        })
    } else {
        res.json({ error: "No user found" })
    }
}

const resetPassword = async (req, res) => {
    const email = req.params.email;
    const password = req.body.password;
    const password1 = req.body.password1;
    const password2 = req.body.password2;
    const user = await db.User.findOne({ where: { email: email } });
    if (user) {
        bcrypt.compare(password, user.password).then((match) => {
            if (match) {
                if (password1 === password2) {
                    bcrypt.hash(req.body.password1, 10).then((hash) => {
                        const info = {
                            password: hash
                        }
                        db.User.update(info, {
                            where: { email: email }
                        })

                        res.json({ message: "Password changed" })
                    })
                } else {
                    res.json({ error: "Passwords not matched" })
                }
            } else {
                res.json({ error: "Wrong Password" })
            }
        })

    } else {
        res.json({ error: "No Such User" })
    }
}

//send OTP
const sendOTP = async (req, res) => {
    const { email } = req.body;
    console.log(email);
    const otp = otpGenerator.generate(6, { digits: true, alphabets: false, upperCase: false, specialChars: false });
    console.log(otp);
    otpMap.set(email, otp);
    const mailOptions = {
        from: 'automatedattendancesystem2228@gmail.com',
        to: email,
        subject: 'OTP Verification',
        text: `Your OTP is ${otp}`,

    }
    transporter.sendMail(mailOptions, (error) => {
        if (error) {
            console.log(error);
            res.status(500).json({ message: 'Failed to send OTP' });
        } else {
            res.status(200).json({ message: 'OTP sent successfully' });
        }
    });
}


//verify OTP
const verifyOTP = async (req, res) => {
    const { email, otp } = req.body;
    if (!email || !otp) {
        res.status(400).json({ message: 'Email and OTP are required' });
        return;
    }

    // Verify OTP here
    const storedOTP = otpMap.get(email);
    // console.log(Stored OTP for ${email}: ${storedOTP});
    if (storedOTP && storedOTP === otp) {
        otpMap.delete(email); // Remove OTP from the map after successful verification
        res.status(200).json({ message: 'OTP verified successfully' });
    } else {
        res.json({ message: 'Invalid OTP' });
    }
}


//send OTP
const sendOTP2 = async (req, res) => {
    const { email1 } = req.body;
    console.log(email1);
    const otp = otpGenerator.generate(6, { digits: true, alphabets: false, upperCase: false, specialChars: false });
    // console.log(Generated OTP for ${email}: ${otp});
    otpMap.set(email1, otp); // Store the OTP in the map
    const mailOptions = {
        from: 'automatedattendancesystem2228@gmail.com',
        to: email1,
        subject: 'OTP Verification',
        text: `Your OTP is ${otp}`,

    }
    transporter.sendMail(mailOptions, (error) => {
        if (error) {
            console.log(error);
            res.status(500).json({ message: 'Failed to send OTP' });
        } else {
            res.status(200).json({ message: 'OTP sent successfully' });
        }
    });
}


//verify OTP
const verifyOTP2 = async (req, res) => {
    const { email1, otp } = req.body;
    if (!email1 || !otp) {
        res.status(400).json({ message: 'Email and OTP are required' });
        return;
    }

    // Verify OTP here
    const storedOTP = otpMap.get(email1);
    // console.log(Stored OTP for ${email}: ${storedOTP});
    if (storedOTP && storedOTP === otp) {
        otpMap.delete(email1); // Remove OTP from the map after successful verification
        res.status(200).json({ message: 'OTP verified successfully' });
    } else {
        res.json({ message: 'Invalid OTP' });
    }
}
const changePassword = async (req, res) => {

    const email1 = req.body.email1;
    const user = await db.User.findOne({ where: { email: email1 } });
    if (!user) {
        res.send({ message: "User not found" });
    } else {
        bcrypt.hash(req.body.newPassword, 10).then((hash) => {
            User.update({
                password: hash
            },
                { where: { email: email1 } }
            )
        });
        res.send({ message: "Password Changed" })
    }
}

module.exports = {
    addUser,
    // updateUser,
    deleteUser,
    getAllUser,
    getOneUser,
    userLogIn, sendOTP, verifyOTP, changePassword, sendOTP2, verifyOTP2,
    verifyUser,
    resetPassword,
}
