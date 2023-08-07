const mongoose = require('mongoose');
let {Schema} = mongoose;

const imageSchema = new Schema({
    img:{
        data: Buffer,
        contentType: String
    }
});

const image = mongoose.model('image', imageSchema);
module.exports = image;