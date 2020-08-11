const express = require('express');
const router = express.Router();
const Posts = require('../models/posts');

//get all posts
router.get('/',async (req,res) => {
    try{
        const getPosts = await Posts.find();
        res.json(getPosts);
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
//Upload post
router.post('/uploadpost',async (req,res) => {
    const posts = new Posts({
        title:req.body.title,
        type:req.body.type,
        price:req.body.price,
        imageUrl:req.body.imageUrl,
        availability:req.body.availability,
        location:req.body.location
    });

    try{
        const savePosts = await posts.save()
    }catch(err){
        res.json({message:err});
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

module.exports = router;