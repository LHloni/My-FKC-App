const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/',(req,res) => {
    res.send('We are on user');
});

router.post('/uploaduser',async (req,res) => {
   const user = new User({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
        typeOfUser:req.body.typeOfUser
    });

    try{
        const saveUser = await user.save()
    }catch(err){
        res.json({message:err});
    }

});

module.exports = router;