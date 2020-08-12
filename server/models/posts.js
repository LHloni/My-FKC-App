const mongoose = require('mongoose');
//enums can also be used in mongoose
const PostSchema = mongoose.Schema({
    userId:{
        type:String,
        required:true
    },title:{
        type:String,
        required:true
    },productOrService:{
        type:String,
        required:true
    },operatingHoursForService:{
        type:String,
        required:false
    },price:{
        type:String,
        required:true
    },description:{
        type:String,
        required:false
    },imageUrl:{
        type:[String],
        required:true
    },availability:{
        type:Boolean,
        default:true
    },location:{
        type:String,
        required:false
    },dateTime:{
        type:Date,
        default:Date.now
    }
});

module.exports = mongoose.model('posts',PostSchema);