const express = require('express');
const Post = require('../models/postSchema');
const commentsRouter = express.Router();
const Comment = require('../models/commentSchema');
const { update } = require('../models/commentSchema');

commentsRouter.post('/:id/addcomment',async (req,res)=>{
    const {id} =req.params;
    const {poster_id,commentText} = req.body;
    const commentData = {
        user_id:poster_id,
        text: commentText,
        swishes: 0,
        swish_users: []
    }
    
    const comment = await new Comment(commentData)

    // 
    var getCommentId;
    await Comment.create(comment,async function (err, comment){
        //Post.findByIdAndUpdate({id},{ $push: {comments:comment._id}})
        if (err){
            return res.send(err)
        }else{// populate and add to data in frontend
             
            await Comment.findById(comment._id).populate('user_id').then(pop_comment=>{
                // console.log(pop_comment)
                 res.send(pop_comment)
            })

            //await Post.findByIdAndUpdate({id},{ $push: {comments:comment._id}}).populate('')
        }
    })
   
})

commentsRouter.put('/:id/addcomment',async (req,res)=>{
    const {id} = req.params;
    const {comment_id} = req.body;

    await Post.findByIdAndUpdate({_id:id},{ $push: {comments:comment_id}}).catch(err=>console.log(err))
})

commentsRouter.delete('/:id/deletecomment',async (req,res)=>{
    const { id } = req.params;
    const { comment_id, comment_poster_id, post_user, deleter_id } = req.body;

    //console.log(id,comment_id,comment_poster_id,post_user,deleter_id)
    var updatePost;
    //check whether the user is the "owner of the post" or the user that posted the comment 
    if (deleter_id === post_user || deleter_id === comment_poster_id) {
        try {
            await Comment.findByIdAndDelete( comment_id)
            return updatePost = true
        } catch (e) {
            console.log({ findDelCommentError: e.message })
            return updatePost = false
        }
        
        console.log(comment_id)
        try {
            await Post.update({_id: id}, { $pull: { comments: {$eq:comment_id} } })
        } catch (e) {
            console.log({ removeCommentFromPostError: e.message })

        }
        
    } else {
        res.send('You have no permission to delete this comment.')
    }
        
})

module.exports=commentsRouter;