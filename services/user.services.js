const userModel = require("../models/user.model")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const CryptoJS = require("crypto-js");

//
/// for signup
module.exports.signup = async (req, res) => {
    const { name, email, password, phone } = req.body
    let user = await userModel.findOne({ email })
    if (user) {
        res.json({ message: 'email already exist' })
    } else {
        // bcrypt.hash(password, Number(process.env.saltRounds), async function (err, hash) {
        //     await userModel.insertMany({ name, email, password: hash })
        //     res.json({ message: 'success' })
        // });
        // await userModel.insertMany({ name, email, password })
        const newUser = new userModel({ name, email, password, phone })
        const savedUesr = await newUser.save()
        res.json({ message: 'success' })
    }
}
/// for signin
module.exports.signin = async (req, res) => {
    const { email, password } = req.body
    let user = await userModel.findOne({ email })
    if (user) {
        const match = await bcrypt.compare(password, user.password);
        if (match) {
            const token = jwt.sign({ id: user._id, name: user.name, isLoggedIn: true },
                process.env.tokenSignature, { expiresIn: '1h' })
            res.json({ message: "Done", token })
        } else {
            res.json({ message: 'sorry... incorrect password' })
        }
    } else {
        res.json({ message: "email dose't exist" })
    }
}
module.exports.profile = async (req, res) => {
    try {
        const user = await userModel.findById(req.user._id)
        user.phone = CryptoJS.AES.decrypt(user.phone, process.env.encrptKey).toString(CryptoJS.enc.Utf8)
        res.json({ message: "Done", user })
    } catch (error) {
        res.json({ message: "catch err", error })
    }

}