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


//@parameters : name,password,(email or number)
//register using post request
router.post('/register',async (req,res) => {
  //check if all fields are not empty

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

            //check if user exists or not
            const getUserEmail = await User.findOne({email:req.body.email},
                (err,docs) => {
                if( err || !docs) {
                 //   res.json({message:"No data"});
                    return null;
                } else {    
                    return docs;
                };
            });

            const getUserNumber = await User.findOne({number:req.body.number},
                (err,docs) => {
                if( err || !docs) {
                  //  res.json({message:"No data"});
                    return null;
                } else {    
                    return docs;
                };
            });

            if((isEmpty(getUserEmail)) &&  isEmpty(getUserNumber)){
                
                const saveUser = await user.save((err,docs) => {
                    if( err || !docs) {
                        res.json({message:"Not added"});
                    } else {    
                        res.json({message:"success"});
                    };
                });
            
            }else{
                res.json({message:"Not added User Already exits"});
            }
            
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


//@parameters : name or password or email or number
//update users profile
router.patch('/updateProfile',async (req,res) => {
    if(req.session.user){

            try{
               
                if(req.session.user != null){

                    //retrive post to compare and see what needs to be updated
                    //also can data in a session variable be modified ?
                    const getUser = await User.findOne({_id:req.session.user._id},(err,docs) => {
                        if( err || !docs) {
                            res.json({message:"No data/user found"});
                        } else {    
                            return docs;
                        };
                    });

                    if(getUser != null){
                        //update new value otherwise return old values
                    //make copy of object since javascript doesnt pass objects by value
                    let objCopy = JSON.parse(JSON.stringify(getUser));

                    var objForUpdatingUser = checkWhichValueNeededToUpdate(objCopy,req.body);
                               
                               if(JSON.stringify(objForUpdatingUser) != JSON.stringify(getUser)){
                                            try{
                                            //images must have a collection of their own
                                            // add images here later
                                                const updatedUser = await User.updateOne({_id:req.session.user._id},{$set:{
                                                    timeDate:Date.now(),
                                                    name:objForUpdatingUser.name,
                                                    email:objForUpdatingUser.email,
                                                    password:objForUpdatingUser.password,
                                                    number:objForUpdatingUser.number
                                                    
                                                }},(err,docs) => {
                                                    if( err || !docs) {
                                                        res.json({message:"No data"});
                                                    } else {    
                                                        res.json({message:"user updated"});
                                                    
                                                    };
                                                    
                                                });
                            
                                            }catch(err){
                                                res.json({message:err});
                                            }
                                }else{
                                    res.json({message:"No Update Since these no change"});
                                }
                    }

                    
                    
                       
                    }else{
                        res.json({message:"User Not Found"});
                    }
                    
                }catch(err){
                    
                    res.json({message:err});
                }
    }else{
        res.json({message:"You Not Logged In"});
    }
  
});

//helper functions
function isEmpty(val){
    return (val === undefined || val == null || val.length <= 0) ? true : false;
}

function checkWhichValueNeededToUpdate(val1Post,val2Post){
    //update this function late by using a for each loop
   if(!isEmpty(val2Post.name) && !(val1Post.name == val2Post.name)){  val1Post.name = val2Post.name;};
   if(!isEmpty(val2Post.email) && !(val1Post.email == val2Post.email)) { val1Post.email = val2Post.email;};
   if(!isEmpty(val2Post.password) && !(val1Post.password == val2Post.password)){val1Post.password = val2Post.password;};
   if(!isEmpty(val2Post.number) && !(val1Post.number == val2Post.number)) {val1Post.number = val2Post.number;};
 
   return val1Post;
}

module.exports = router;