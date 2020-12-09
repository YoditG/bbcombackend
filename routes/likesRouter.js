var express = require('express');
const Post = require('../models/postSchema');
var likesRouter = express.Router();


// likesRouter.put('/:id/profile/likes',async (req,res)=>{
//     const {id} = req.params;
//     const {post_id, swishes,swish_users} = req.body;

//     if(swish_users.includes(id)){
//         //try{
//             console.log('hallo, hier bin ich ')
//             await Post.updateOne({'_id': post_id },{swish_users,swishes},{new:true})
            
//         //}catch(e){
//             //console.log('error', { message: e.message })
//         //} 
//     }else{
//         //try{
//             await Post.updateOne({'_id': post_id }, { $push: {swish_users:id },$inc: {'swishes': 1}},{new:true})
            
//         //}catch(e){
//             //console.log('error', { message: e.message })
//         //}
//     }
// })


likesRouter.put('/:user/posts/:id/likes', async (req, res) => {
    const { user, id } = req.params;
    try {
      const post = await Post.findById(id);
      let updatedPost;
      if (post.swish_users.includes(user)) {
        updatedPost = await Post.findOneAndUpdate(
          { _id: id },
          { $pull: { swish_users: user }, $inc: { swishes: -1 } },
          {
            new: true,
            runValidators: true
          }
        );
        res.status(200).send(updatedPost);
      } else {
        updatedPost = await Post.findOneAndUpdate(
          { _id: id },
          { $addToSet: { swish_users: user }, $inc: { swishes: 1 } },
          {
            new: true,
            runValidators: true
          }
        );
        res.status(200).send(updatedPost);
      }
    } catch ({ name, message, stack }) {
      res.status(500).send({
        name,
        message,
        stack
      });
    }
  });

module.exports = likesRouter;