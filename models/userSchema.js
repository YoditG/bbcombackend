const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator')
const jwt = require('jsonwebtoken')

const userSchema = new Schema({
    first_name: {type: String, min: 2, max: 30, required: true},
    last_name: {type: String, min: 2, max: 30, required: false},
    username: {type: String, min: 2, max: 30, required: true, unique:true},
    birth_date: {type: Date,required: true},
    email: {type: String, min: 2, max: 30, required: true},
    role:[{ 
        type: String,
        enum: ['baller', 'fan', 'trainer']
    }],
    password: {type: String, required: true},
    last_password_reset: {type: Date},
    last_login: {ype: Date},
    profilePic: {type: String},
    friends: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }],
    events: [{ type: Schema.Types.ObjectId, ref: 'Event', required: true }],
    Groups: [{ type: Schema.Types.ObjectId, ref: 'Group', required: true }],
    bio: {type: String, max: 100}
})
userSchema.plugin(uniqueValidator,{message: 'ERROR: username not available'})

userSchema.methods.createToken = function() {
    const payload = {_id:this._id,username:this.username,role:this.role }
    const secret = process.env.MY_SECRET
    const expiration = { expiresIn: '2h' }
    const token = jwt.sign(payload, secret, expiration)
    return token
}
const User = mongoose.model('User',userSchema)

module.exports = User