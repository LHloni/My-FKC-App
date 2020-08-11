const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },email:{
        type:String,
        required:false
    },password:{
        type:String,
        required:true
    },timeDate:{
        type:Date,
        default:Date.now
    },number:{
        type:String,
        required:false
    }
});

module.exports = mongoose.model('users',UserSchema);