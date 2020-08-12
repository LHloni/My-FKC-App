const mongoose = require('mongoose');

const UserLikeSchema = mongoose.Schema({
    idOfPeopleWhoLike:{
        type:String,
        required:false
    },dateTime:{
        type:Date,
        required:Date.now
    }
});

const LikesSchema = mongoose.Schema({
    idOfPost:{
        type:String,
        required:true
    },IOPWL:[{type: UserLikeSchema, ref: 'userlikes'}]
    
});

module.exports = mongoose.model('likes',LikesSchema);