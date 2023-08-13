const mongoose = require('mongoose');
let { Schema } = mongoose;

const imageSchema = new Schema({
    User: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    title:{
        type: String,
        required: false
    },
    img: {
        data: Buffer,
        contentType: String
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const image = mongoose.model('image', imageSchema);
module.exports = image;