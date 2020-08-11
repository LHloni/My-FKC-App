const express = require('express');
const router = express.Router();
const User = require('../models/user');

//login using get request
router.get('/login',async (req,res) => {

    if(!isEmpty(req.body.emailOrNumber) &&
    !isEmpty(req.body.password)){


    //either login with email or with whatsapp number
        if((req.body.emailOrNumber).includes("@")){
           /*Encrypt password later */
           try{
                //return user
                const getUser = await User.findOne({email:req.body.emailOrNumber,password:req.body.password},
                    (err,docs) => {
                        if( err || !docs) {
                            
                            res.json({status:"Not LoggedIn",
                            name:req.body.emailOrNumber,
                            password:req.body.password,
                            });
                        } else {  
                            
                            //start a session 
                            req.session.user = docs;
                            res.json({message:"success"});  
                            return docs;
                        };
                    });
            
            }catch(err){
                res.json({message:err});
            }

        }else{
           //logging in with number
           try{

            const getUser = await User.findOne({number:req.body.emailOrNumber,password:req.body.password},
                (err,docs) => {
                    if( err || !docs) {
                        res.json({status:"Not LoggedIn",
                        name:req.body.emailOrNumber,
                        password:req.body.password,
                        });
                    } else {         
                        res.json({message:"success"});   
                        return docs;
                    };
                });
           
        }catch(err){
            res.json({message:err});
        }
        }
    }else{
        res.json({status:"Not LoggedIn",
        name:req.body.emailOrNumber,
        password:req.body.password,
        });
    }
   
});

//register using post request
router.post('/register',async (req,res) => {
  
    if(!isEmpty(req.body.name) &&
     !isEmpty(req.body.password) &&
     (!isEmpty(req.body.email) ||
     !isEmpty(req.body.number))){
       
       const user = new User({
            name:req.body.name,
            email:req.body.email,
            password:req.body.password,
            number:req.body.number
        });
    
        try{
            const saveUser = await user.save();
            res.json({message:"success"});
        }catch(err){
            //create verification code here
            res.json({message:err});
        }
    }else{
        res.json({status:"Not Added",name:req.body.name,
        password:req.body.password,
        email:req.body.email,
        number:req.body.number});
    }
  

});

function isEmpty(val){
    return (val === undefined || val == null || val.length <= 0) ? true : false;
}


module.exports = router;