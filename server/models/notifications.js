const mongoose = require('mongoose');

const NotificationsSchema = mongoose.Schema({
    idOfPost:{
        type:String,
        required:true
    },idOfUser:{
        type:String,
        required:true
    },message:{
        type:String,
        required:true
    },read:{
        type:Boolean,
        default:false
    },dateTime:{
        type:Date,
        required:Date.now
    }
});

module.exports = mongoose.model('notifications',NotificationsSchema);