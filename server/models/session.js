const mongoose = require('mongoose');

const SessionSchema = mongoose.Schema({
    userId:{
        type:String,
        required:true
    },token:{
        type:String,
        required:true
    },timeDate:{
        type:Date,
        default:Date.now
    }
});

module.exports = mongoose.model('session',SessionSchema);