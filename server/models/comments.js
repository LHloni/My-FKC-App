const mongoose = require('mongoose');

const UserCommentsSchema = mongoose.Schema({
    idOfUserCommenting:{
        type:String,
        required:true},
    message:{
        type:String,
        required:true},
    dateTime:{
        type:Date,
        default:Date.now
    }
 });

const CommentsSchema = mongoose.Schema({
    idOfPost:{
        type:String,
        required:true
    },UIMC:[UserCommentsSchema]
 
});

module.exports = mongoose.model('comments',CommentsSchema);