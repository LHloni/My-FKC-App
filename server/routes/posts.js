const express = require('express');
const router = express.Router();
const Posts = require('../models/posts');

//logout
router.get('/logout',async (req,res) => {
    //if not logged in when session not set 
    if(!req.session.user){
        console.log({message:"not logged in"});
    }else{
        //destroy session
        req.session.destroy();
        //redirect user
        res.redirect('/');

    }
    
});
//get all posts
router.get('/',async (req,res) => {
    //we do not really care if user is logged in or not
        try{
            //add a limit for the post next time
            const getPosts = await Posts.find((err,docs) => {
                if( err || !docs) {
                    res.json({message:"Not data"});
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
//get specific post
router.get('/:postId',async (req,res) => {
    try{
        const getPost = await Posts.findById(req.params.postId);
        res.json(getPost);
    }catch(err){
        res.json({message:err});
    }
});
//Upload a post
router.post('/uploadpost',async (req,res) => {
    //check if logged in
    if(req.session.user){
        if(!isEmpty(req.body.userId) &&
        !isEmpty(req.body.title) &&
        !isEmpty(req.body.productOrService) &&
        !isEmpty(req.body.price) &&
        !isEmpty(req.body.imageUrl)){
        const posts = new Posts({
            userId:req.body.userId,
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
                    res.json({message:"Not data"});
                } else {    
                    res.json({message:"data uploaded"});
                    return docs;
                };
                
            });
        
        }catch(err){
            res.json({message2:err});
        } 
        }else{
            res.json({status:"Not Uploaded",
            userId:req.body.userId,
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
// delete a specific post
router.delete('/:postId',async (req,res) => {
    try{
        const removedPost = await Posts.remove({_id:req.params.postId});
        res.json(removedPost);
    }catch(err){
        res.json({message:err});
    }
});
// update a specific post
router.patch('/:postId',async (req,res) => {
    try{
        const updatedPost = await Posts.updateOne({_id:req.params.postId},{$set:{
            title:req.body.title
        }});
        res.json(updatedPost);
    }catch(err){
        res.json({message:err});
    }
});

function isEmpty(val){
    return (val === undefined || val == null || val.length <= 0) ? true : false;
}

module.exports = router;