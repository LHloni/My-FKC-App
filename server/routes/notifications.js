const express = require('express');
const router = express.Router();
const Notifications = require('../models/notifications');

router.get('/',(req,res) => {
    res.send('We are on notifications');
});

router.post('/uploaduser',async (req,res) => {
    const notifications = new Notifications({
        message:req.body.message,
        idOfUser:req.body.idOfUser
     });
 
     try{
        const saveNotifications = await notifications.save()
    }catch(err){
        res.json({message:err});
    }
 
 });

module.exports = router;