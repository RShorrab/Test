const mongoose = require('mongoose')

module.exports.dbConnection = () => {
    mongoose.connect(process.env.CONNECTION_STRING).then(() => {
        console.log('db connected');
    }).catch((err) => {
        console.log('DBerror',err);
    })
}