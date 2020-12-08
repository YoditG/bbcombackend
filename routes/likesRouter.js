var express = require('express');
const Post = require('../models/postSchema');
var likesRouter = express.Router();


likesRouter.put('/:id/profile/likes',async (req,res)=>{
    const {id} = req.params;
    const {post_id, swishes,swish_users} = req.body;

    if(swish_users.includes(id)){
        //try{
            console.log('hallo, hier bin ich ')
            await Post.updateOne({'_id': post_id },{ $pull: {swish_users:id },$inc: {'swishes': -1}},{new:true})
            
        //}catch(e){
            //console.log('error', { message: e.message })
        //}
    }else{
        //try{
            await Post.updateOne({'_id': post_id }, { $push: {swish_users:id },$inc: {'swishes': 1}},{new:true})
            
        //}catch(e){
            //console.log('error', { message: e.message })
        //}
    }
})

module.exports = likesRouter;