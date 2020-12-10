const express = require('express');
const Post = require('../models/postSchema');
const likesRouter = express.Router();

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