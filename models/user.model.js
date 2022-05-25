const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const CryptoJS = require("crypto-js");
const userSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    phone: String

}, { timestamps: true })

userSchema.pre('insertMany', async function (next, docs) {
    console.log(docs);
    docs.password = await bcrypt.hash(docs.password, parseInt(process.env.saltRounds))
    docs.phone = CryptoJS.AES.encrypt(docs.phone, process.env.encrptKey).toString();
    console.log(docs);
    next()
})
userSchema.pre('save', async function (next) {
    console.log(this);
    this.password = await bcrypt.hash(this.password, parseInt(process.env.saltRounds))
    this.phone = CryptoJS.AES.encrypt(this.phone, process.env.encrptKey).toString();
    console.log(this);
    next()
})

module.exports = mongoose.model('user', userSchema)