const express = require('express');
const Post = require('../models/postSchema');
const commentsRouter = express.Router();
const Comment = require('../models/commentSchema');
const { update } = require('../models/commentSchema');

commentsRouter.post('/:id/addcomment',async (req,res)=>{
    const {id} =req.params;
    const {poster_id,commentText,post_id} = req.body;
    const commentData = {
        user_id:poster_id,
        text: commentText,
        swishes: 0,
        swish_users: []
    }
    
    try{
        const comment = await new Comment(commentData)
        var getCommentId;
        await Comment.create(comment,async function (err, comment){
        //Post.findByIdAndUpdate({id},{ $push: {comments:comment._id}})
        let pop_comment,newPost;
        if (err){
            console.log(err)
            return res.send(err)
        }else{// populate and add to data in frontend
            try{
                pop_comment = await Comment.findById(comment._id).populate('user_id');
                
                newPost = await Post.findByIdAndUpdate({_id:post_id},{ $push: {comments:pop_comment._id}},{
                    new: true,
                    runValidators: true
                  })
                return res.status(200).send({pop_comment,newPost})
               
            }catch(e){
                console.log({populateCommentUpdatePost: e.message})
            }

            //await Post.findByIdAndUpdate({id},{ $push: {comments:comment._id}}).populate('')
        }
    })

}catch(e){
    console.log({createComment: e.message})
}
   
})


commentsRouter.delete('/:id/deletecomment',async (req,res)=>{
    const { id } = req.params;
    const { comment_id, comment_poster_id, post_user, deleter_id } = req.body;

    //console.log(id,comment_id,comment_poster_id,post_user,deleter_id)
    var updatePost;
    //check whether the user is the "owner of the post" or the user that posted the comment 
    if (deleter_id === post_user || deleter_id === comment_poster_id) {
        var updatedComments;
        try {
            updatedComments = await Comment.findByIdAndDelete( comment_id)
        } catch (e) {
            console.log({ findDelCommentError: e.message })
            res.status(500).send({ findDelCommentError: e.message })
        }
        var updatedPosts;
        
        try {
            updatedPosts = await Post.findOneAndUpdate({_id: id}, { $pull: { comments: comment_id } }, {
                new: true,
                runValidators: true
              })
            res.status(200).send({updatedComments,updatedPosts})
        } catch (e) {
            console.log({ removeCommentFromPostError: e.message })

        }
        
    } else {
        res.send('You have no permission to delete this comment.')
    }
        
})

module.exports=commentsRouter;