var express = require('express');
const Baller = require('../models/ballerSchema');
var userRouter = express.Router();
const client = require('./../client/client')
const User = require('./../models/userSchema')
const Team = require('./../models/teamSchema');
const Post = require('../models/postSchema');
const Comment = require('../models/commentSchema')
const authorizeUser = require('../middlewares/authMiddleware');
const { userData } = require('../controllers/authUserController');


/* GET users listing. */
userRouter.get('/:id/profile',authorizeUser, async function(req, res, next) {
  // const userData = {}
  const { id } = req.params
  let user
  let posts
  try {
      user = await User.findById(id)
      posts = await Post
      .find({"user_id": id})
      .populate('poster_id')
      .populate({ 
        path: 'comments',
        model: 'Comment',
        populate: {
          path: 'user_id',
          model: 'User',
        }
      })
    } catch (e) {
      console.log({findUserError: e.message})
    }
  let baller;
  let team;
  if(user.role.includes('baller')) {
    try {
      baller = await Baller.findOne({'user_id': user._id })
    } catch (e)  {
      console.log({findBallerError: e.message})
    }

    if (baller.team_id) {
      try {
        team = await Team.findById(baller.team_id)
      } catch (e) {
        console.log({findTeamError: e.message})
      }
    }
  }

   

   res.send({user,posts,baller,team})
})


userRouter.post('/posts',async (req,res)=>{
  const {user_id,
  poster_id,
  date,
  text,
  image,
  swishes,
  shares,
  comments} = req.body;

  const post = {user_id,
    poster_id,
    date,
    text,
    image,
    swishes,
    shares,
    comments}

    const newPost = new Post(post)

    await newPost.save()

  // console.log(newPost)
})

userRouter.get('/:id/userData',authorizeUser,userData)

module.exports = userRouter;
