const express = require('express');
const router = express.Router();
const Posts = require('../models/posts');
const Likes = require('../models/likes');
const Comments = require('../models/comments');

//logout
router.get('/logout',async (req,res) => {
    //if not logged in when session not set 
    if(!req.session.user){
        res.json({message:"not logged in"});
    }else{
        //destroy session
        req.session.destroy();
    }

     //redirect user
     res.redirect('/');
    
});
//get all posts
router.get('/',async (req,res) => {
    //we do not really care if user is logged in or not
        try{
            //add a limit for the post next time
            const getPosts = await Posts.find((err,docs) => {
                if( err || !docs) {
                    res.json({message:"No data"});
                } else {    
                    return docs;
                };
            });
            if(getPosts != null){
                res.json(getPosts);
            }
            
        }catch(err){
            res.json({message:err});
        }
 
});
//get all my post show 5 at a time using a limit next time
router.get('/getMyPost',async (req,res) => {
        //check if user is logged in or not
        if(req.session.user){
            try{
                //add a limit for the post next time
                const getMyPosts = await Posts.find({userId:req.session.user._id},(err,docs) => {
                    if( err || !docs) {
                        res.json({message:"No data"});
                    } else {    
                        return docs;
                    };
                });
                if(getMyPosts != null){
                    res.json(getMyPosts);
                }
                
            }catch(err){
                res.json({message:err});
            }
        }else{
            res.json({message:"not logged in"});
        }
        
});
//create a post
router.post('/uploadpost',async (req,res) => {
    //check if logged in
    if(req.session.user){
        if(!isEmpty(req.session.user._id) &&
        !isEmpty(req.body.title) &&
        !isEmpty(req.body.productOrService) &&
        !isEmpty(req.body.price) &&
        !isEmpty(req.body.imageUrl)){
        const posts = new Posts({
            userId:req.session.user._id,
            title:req.body.title,
            productOrService:req.body.productOrService,
            operatingHoursForService:req.body.operatingHoursForService,
            price:req.body.price,
            description:req.body.description,
            imageUrl:req.body.imageUrl,
            location:req.body.location
        });
    
        try{
            const savePosts = await posts.save((err,docs) => {
                if( err || !docs) {
                    res.json({message:"No data"});
                } else {    
                    //create comments schema and likes schema
                    if(createLikesSchema(docs._id,res) && createCommentsSchema(docs._id,res)){
                        res.json({message:"data uploaded"});
                    }else{
                        res.json({message:"Not Uploaded"});
                    }
                    return docs;
                };
                
            });
        
        }catch(err){
            res.json({message2:err});
        } 
        }else{
            res.json({status:"Not Uploaded",
            title:req.body.title,
            productOrService:req.body.productOrService,
            price:req.body.price,
            operatingHoursForService:req.body.operatingHoursForService,
            description:req.body.description,
            imageUrl:req.body.imageUrl,
            location:req.body.location});
        }
    }else{
        res.json({message:"You Not Logged In"});
    }
});
// delete my specified post
router.delete('/deletePost',async (req,res) => {
    //check if logged in
    if(req.session.user){
        try{
            if(!isEmpty(req.session.user._id) && !isEmpty(req.body._id)){
                
                if(req.session.user._id == req.body.userId){
                    const removedPost = await Posts.deleteOne({_id:req.body._id},(err,docs) => {
                        if( err || !docs) {
                            res.json({message:"No data"});
                        } else {    
                            res.json({message:"post deleted"});
                            
                            return docs;
                        };
                        
                    });
                }else{
                    res.json({message:"Failed to deleted Post not yours"});
                }

            }else{
                res.json({message:"User or post not found"});
            }
            
        }catch(err){
            res.json({message:err});
        }
    }else{
        res.json({message:"You Not Logged In"});
    }
});
// update a specific post
router.patch('/updatePost',async (req,res) => {
     //check if logged in
     if(req.session.user){
        //check if user Id is equal to post user id
        if(!isEmpty(req.session.user._id) && !isEmpty(req.body.userId)){
                //check if logged in user is the user who owns post
            if(req.session.user._id == req.body.userId){

                try{
                    //retrive post to compare and see what needs to be updated
                    const getSpecifiedPosts = await Posts.findOne({userId:req.session.user._id},(err,docs) => {
                        if( err || !docs) {
                            res.json({message:"No data"});
                        } else {    
                            return docs;
                        };
                    });

                    if(getSpecifiedPosts != null){
                        //update new value otherwise return old values
                        //make copy of object since javascript doesnt pass objects by value
                        let objCopy = JSON.parse(JSON.stringify(getSpecifiedPosts));

                        var objForUpdatingPost = checkWhichValueNeededToUpdate(objCopy,req.body);
                     
                                   if(JSON.stringify(objForUpdatingPost) != JSON.stringify(getSpecifiedPosts)){
                                                try{
                                                //images must have a collection of their own

                                                    const updatedPost = await Posts.updateOne({_id:req.body._id,userId:req.body.userId},{$set:{
                                                        dateTime:Date.now(),
                                                        location:objForUpdatingPost.location,
                                                        description:objForUpdatingPost.description,
                                                        price:objForUpdatingPost.price,
                                                        productOrService:objForUpdatingPost.productOrService,
                                                        operatingHoursForService:objForUpdatingPost.operatingHoursForService,
                                                        title:objForUpdatingPost.title,
                                                        availability:objForUpdatingPost.availability,
                                                        imageUrl:objForUpdatingPost.imageUrl
                                                    }},(err,docs) => {
                                                        if( err || !docs) {
                                                            res.json({message:"No data"});
                                                        } else {    
                                                            res.json({message:"post update"});
                                                        
                                                        };
                                                        
                                                    });
                                
                                                }catch(err){
                                                    res.json({message:err});
                                                }
                                    }else{
                                        res.json({message:"No Update"});
                                    }
                        
                           
                        }else{
                            res.json({message:"Post Not Found"});
                        }
                        
                    }catch(err){
                        
                        res.json({message:err});
                    }

            }else{
                res.json({message:"Failed to Update Post its not yours"});
            }

        }else{
            res.json({message:"User or post not found"});
        }
    }else{
        res.json({message:"You Not Logged In"});
    }
});

//liking a post
router.patch('/likepost',async (req,res) => {
    //check if logged in
    if(req.session.user){

            if(!isEmpty(req.session.user._id) && !isEmpty(req.body.postId) ){
                  //adding user like/id to likes database
                try{
                    //retrive likes data to compare and see what needs to be updated
                    const getSpecifiedLikes = await Likes.findOne({idOfPost:req.body.postId,_id:req.body._id},(err,docs) => {
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
                                  //if user not found the add like aka like 
                                  if(!remove) Add = true;

                            }else{
                                //if likes array empty then add a like
                                Add = true;
                            }
                           
                            //add like add from likes array
                            if(Add){   
                                const likesUpdates =  Likes.updateOne({idOfPost:getSpecifiedLikes.idOfPost,_id:getSpecifiedLikes._id},
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

//add comment on a post
router.patch('/commentpost',async (req,res) => {
    //check if logged in
    if(req.session.user){

            if(!isEmpty(req.session.user._id) && !isEmpty(req.body.postId) ){
                  //adding user comment/id to likes database
                try{
                    //retrive likes data to compare and see what needs to be updated
                    const getSpecifiedComment = await Comments.findOne({idOfPost:req.body.postId,_id:req.body._id},(err,docs) => {
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

//functions for create comments schema and likes schema

async function createCommentsSchema(idOfPostVal){

    const comments = new Comments({
        idOfPost:idOfPostVal 
    });

    try{
        const saveComments = await comments.save((err,docs) => {
            if( err || !docs) {
                return false;
            } else {    
                return true;
            };
            
        });
    
    }catch(err){
        return false;
    } 
};

async function createLikesSchema(idOfPostVal){

    const likes = new Likes({
        idOfPost:idOfPostVal 
    });

    try{
        const saveLikes = await likes.save((err,docs) => {
            if( err || !docs) {
                return false;
            } else {    
                return true;
            };
            
        });
    
    }catch(err){
        return false;
    } 
};
//helper functions
function isEmpty(val){
    return (val === undefined || val == null || val.length <= 0) ? true : false;
}

function checkWhichValueNeededToUpdate(val1Post,val2Post){
     //update this function late by using a for each loop
    if(!isEmpty(val2Post.imageUrl) && !(val1Post.imageUrl == val2Post.imageUrl)){  val1Post.imageUrl = val2Post.imageUrl;};
    if(!isEmpty(val2Post.availability) && !(val1Post.availability != val2Post.availability)) { val1Post.availability = val2Post.availability;};
    if(!isEmpty(val2Post.title) && !(val1Post.title == val2Post.title)){val1Post.title = val2Post.title;};
    if(!isEmpty(val2Post.productOrService) && !(val1Post.productOrService == val2Post.productOrService)) {val1Post.productOrService = val2Post.productOrService;};
    if(!isEmpty(val2Post.operatingHoursForService) && !(val1Post.operatingHoursForService == val2Post.operatingHoursForService)){val1Post.operatingHoursForService = val2Post.operatingHoursForService;};
    if(!isEmpty(val2Post.price) && !(val1Post.price == val2Post.price)) {val1Post.price = val2Post.price;};
    if(!isEmpty(val2Post.description) && !(val1Post.description == val2Post.description)) {val1Post.description = val2Post.description;};
    if(!isEmpty(val2Post.location) && !(val1Post.location == val2Post.location)) {val1Post.location = val2Post.location;};

    return val1Post;
}


module.exports = router;