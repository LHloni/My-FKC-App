const mongoose = require('mongoose');

const NotificationsSchema = mongoose.Schema({
    message:{
        type:String,
        required:true
    },idOfUser:{
        type:String,
        required:true
    }
});

module.exports = mongoose.model('notifications',NotificationsSchema);