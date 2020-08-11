const mongoose = require('mongoose');

const UserCommentSchema = mongoose.Schema({
    idOfUserCommenting:{
        type:String,
        required:true
    },message:{
        type:String,
        required:true
    },dateTime:{
        type:Date,
        required:Date.now
    }
});

const CommentsSchema = mongoose.Schema({
    idOfPost:{
        type:String,
        required:true
    },UIMC:{
        type:[UserCommentSchema],
        required:true
    }
 
});

module.exports = mongoose.model('comments',CommentsSchema);