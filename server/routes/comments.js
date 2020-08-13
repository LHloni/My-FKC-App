const express = require('express');
const router = express.Router();

const Comments = require('../models/comments');

//@parameters : postId
//add comment on a post
router.patch('/commentpost',async (req,res) => {
    //check if logged in
    if(req.session.user){

            if(!isEmpty(req.session.user._id) && !isEmpty(req.body.postId) ){
                  //adding user comment/id to likes database
                try{
                    //retrive likes data to compare and see what needs to be updated
                    const getSpecifiedComment = await Comments.findOne({idOfPost:req.body.postId},(err,docs) => {
                        if( err || !docs) {
                            res.json({message:"No data added"});
                        } else {    
                           return docs;
                        };
                    });
   
                    if(!isEmpty(getSpecifiedComment) && !isEmpty(req.body.message)){
                        //add comment to array 
                        const saveComments = Comments.updateOne({idOfPost:getSpecifiedComment.idOfPost},
                            {
                                $push :{
                                    UIMC : {idOfUserCommenting: req.session.user._id,
                                            message : req.body.message,
                                            dateTime : Date.now()}
                                },
                            },(err,docs) => {
                            if( err || !docs) {
                                res.json({message:"No data add"});
                            } else {    
                                res.json({message:"comment added"});
                            };
                        
                            });
                          
                }else{
                    res.json({message:"no comment to added"});
                }
                
                }catch(err){
                        
                    res.json({message:err});
                }
            }else{
                res.json({status:"Comments Not Added"});
            }
    }else{
        res.json({message:"You Not Logged In"});
    }
});

//@parameters : postId , commentId {id of specific comment}
//removing comment
router.patch('/deletecommentpost',async (req,res) => {
    //check if logged in
    if(req.session.user){

            if(!isEmpty(req.session.user._id) && !isEmpty(req.body.postId) ){
                  //adding user comment/id and message to comments database
                try{
                    //retrive comment data to compare and see what needs to be updated
                    const getSpecifiedComment = await Comments.findOne({idOfPost:req.body.postId},(err,docs) => {
                        if( err || !docs) {
                            res.json({message:"No data added"});
                        } else {    
                           return docs;
                        };
                    });

                    if(!isEmpty(getSpecifiedComment)){
                        //add comment to array 
                        const saveComments = Comments.updateOne({idOfPost:getSpecifiedComment.idOfPost,_id:getSpecifiedComment._id},
                            {
                                $pull :{
                                    UIMC : {_id: req.body.commentId,
                                        idOfUserCommenting : req.session.user._id
                                        }
                                },
                            },(err,docs) => {
                            if( err || !docs) {
                                res.json({message:"No data add"});
                            } else {    
                                res.json({message:"comment removed"});
                            };
                        
                            });
                          
                }
                
                }catch(err){
                        
                    res.json({message:err});
                }
            }else{
                res.json({status:"Comments Not Removed"});
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