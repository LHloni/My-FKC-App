const express = require('express');
const router = express.Router();

const Likes = require('../models/likes');

//@parameters : postId
//liking and unliking a post
router.patch('/likepost',async (req,res) => {
    //check if logged in
    if(req.session.user){

            if(!isEmpty(req.session.user._id) && !isEmpty(req.body.postId) ){
                  //adding user like/id to likes database
                try{
                    //retrive likes data to compare and see what needs to be updated
                    const getSpecifiedLikes = await Likes.findOne({idOfPost:req.body.postId},(err,docs) => {
                        if( err || !docs) {
                            res.json({message:"No data"});
                        } else {    
                            return docs;
                        };
                    });

                    if(!isEmpty(getSpecifiedLikes)){
                        
                            //dont add or remove like initially
                            let Add = false;
                            let remove = false

                            if(!isEmpty(getSpecifiedLikes.IOPWL)){

                                for (let i = 0; i < getSpecifiedLikes.IOPWL.length; i++) {
                                    //if user found then remove like aka unlike
                                    if(getSpecifiedLikes.IOPWL[i].idOfPeopleWhoLike == req.session.user._id){
                                        remove = true;
                                        i = getSpecifiedLikes.IOPWL.length + 1;
                                    }
                                  }
                                  //if user not found then add like aka like 
                                  if(!remove) Add = true;

                            }else{
                                //if likes array empty then add a like
                                Add = true;
                            }
                           
                            //add like add from likes array
                            if(Add){   
                                const likesUpdates =  Likes.updateOne({idOfPost:getSpecifiedLikes.idOfPost},
                                    {
                                        $push :{
                                            IOPWL : {idOfPeopleWhoLike : req.session.user._id,
                                            dateTime : Date.now()}
                                        },
                                    },(err,docs) => {
                                    if( err || !docs) {
                                        res.json({message:"No data add"});
                                    } else {    
                                        res.json({message:"like added"});
                                    };
                                
                                    });
                                }
                                //remove like remove from likes array
                                if(remove && !isEmpty(getSpecifiedLikes.IOPWL)){   
                                    const likesUpdates =  Likes.updateOne({idOfPost:getSpecifiedLikes.idOfPost,_id:getSpecifiedLikes._id},
                                        {
                                            $pull :{
                                                IOPWL : {idOfPeopleWhoLike : req.session.user._id}
                                            }
                                        },(err,docs) => {
                                        if( err || !docs) {
                                            res.json({message:"No data removed"});
                                        } else {    
                                            res.json({message:"like removed"});
                                        };
                                    
                                        });
                                    }
                        
                    }
                
                }catch(err){
                        
                    res.json({message:err});
                }
            }else{
                res.json({status:"Like Not Updated"});
            }
    }else{
        res.json({message:"You Not Logged In"});
    }
});


//helper functions
function isEmpty(val){
    return (val === undefined || val == null || val.length <= 0) ? true : false;
}


module.exports = router;