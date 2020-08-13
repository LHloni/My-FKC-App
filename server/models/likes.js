const mongoose = require('mongoose');

const UserLikesSchema = mongoose.Schema({
    idOfPeopleWhoLike:{
         type:String,
         required:true
     },dateTime:{
         type:Date,
         default:Date.now
     }
 });

const likesModel = mongoose.model('userlikes',UserLikesSchema);

const LikesSchema = mongoose.Schema({
    idOfPost:{
        type:String,
        required:true
    },IOPWL:[UserLikesSchema]
    
});

module.exports = mongoose.model('likes',LikesSchema);