const mongoose = require('mongoose');

const CommentsSchema = mongoose.Schema({
    idOfPost:{
        type:String,
        required:true
    },UIMC:[{idOfUserCommenting:{type:String,
        required:true}},
    {message:{type:String,
        required:true}},
    {dateTime:{
        type:Date,
    default:Date.now
    }}]
 
});

module.exports = mongoose.model('comments',CommentsSchema);