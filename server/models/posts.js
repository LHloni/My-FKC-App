const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },type:{
        type:String,
        required:true
    },price:{
        type:Number,
        required:true
    },imageUrl:{
        type:String,
        required:false
    },availability:{
        type:String,
        required:true
    },location:{
        type:String,
        required:true
    }
});

module.exports = mongoose.model('posts',PostSchema);