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
    },UIMC:[{type: UserCommentSchema, ref: 'usercomments'}]
 
});

module.exports = mongoose.model('comments',CommentsSchema);