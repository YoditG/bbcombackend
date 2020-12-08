const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const commentSchema = new Schema({
    user_id:  { type: Schema.Types.ObjectId, required: true ,ref: 'User' },
    date: {type: Date,default: Date.now},
    text: {type: String, min: 1, required: true},
    swishes:{ type: Number},
    swish_users: [{type: Schema.Types.ObjectId, required: true,ref: 'User'}],
})
const Comment = mongoose.model('Comment',commentSchema)

module.exports = Comment