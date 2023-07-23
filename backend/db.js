const mongoose = require('mongoose');
const mongoURI = "mongodb://127.0.0.1:27017/CloudDrive?readPreference=primary&appname=MongoDB%20Compass";
const connectToMongo = () => {
    mongoose.connect(mongoURI, () => {
            console.log('Successfully Connect to mongoDb Database');
    })
};
module.exports = connectToMongo;