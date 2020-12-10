const User = require('../models/userSchema')
const bcrypt = require('bcrypt')

exports.login = async (req, res) => {
    const { username, password } = req.body
    let user = await User.findOne({ username })
    if (!user) return res.status(400).send('Invalid Credentials')
    
    const match = await bcrypt.compare(password, user.password)
    if (!match) return res.status(400).send('Invalid Credentials') // bad request
    const token = user.createToken()
    res.set('x-authorization-token', token).send("Login successful!")
}