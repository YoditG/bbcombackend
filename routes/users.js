var express = require('express');
const Baller = require('../models/ballerSchema');
var router = express.Router();
const client = require('./../client/client')
const userMiddlewares = require('./../middlewares/userMiddlewares')
const User = require('./../models/userSchema')
const Team = require('./../models/teamSchema');
const Post = require('../models/postSchema');
const Comment = require('../models/commentSchema')

/* GET users listing. */
router.get('/:id/profile', async function(req, res, next) {
  const userData = {}
  const { id } = req.params

  try {
      userData.user = await User.findById(id)
    } catch (e) {
      console.log({findUserError: e.message})
    }

  if(userData.user.role.includes('baller')) {
    try {
      userData.baller = await Baller.findOne({'user_id': userData.user._id })
    } catch (e)  {
      console.log({findBallerError: e.message})
    }

    if (userData.baller.team_id) {
      try {
        userData.team = await Team.findById(userData.baller.team_id)
      } catch (e) {
        console.log({findTeamError: e.message})
      }
    }
  }

   userData.posts = await Post
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

   res.send(userData)
})

router.post('/register',userMiddlewares.checkUser,(req,res)=>{
  res.send('user registered')
})


router.post('/posts',async (req,res)=>{
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

module.exports = router;
