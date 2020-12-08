const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const postSchema = new Schema({
    user_id:  { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    poster_id: { type: Schema.Types.ObjectId, required: true,ref: 'User' },
    date: {type: Date, default: Date.now},
    text: {type: String, min: 1},
    image: {type: String, required:() => !this.text },
    swishes:{ type: Number},
    swish_users: [{type: Schema.Types.ObjectId, required: true,ref: 'User'}],
    shares:{ type: Number},
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment'}]
})
const Post = mongoose.model('Post',postSchema)

module.exports = Post