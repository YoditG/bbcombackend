const User = require('../models/userSchema')
const Baller = require('../models/ballerSchema')
const Team = require('../models/teamSchema')
const bcrypt = require('bcrypt')

exports.login = async (req, res) => {
    const { username, password } = req.body
    const user = await User.findOne({ username })
    
    if (!user) return res.status(400).send('Invalid Credentials')
    
    const match = await bcrypt.compare(password, user.password)
    if (!match) return res.status(400).send('Invalid Credentials') // bad request
    const token = user.createToken()

    
    // if(user.role.includes('baller')) {
    
    //     try {
    //         baller = await Baller.findOne({'user_id': user._id })
    //         if (baller.team_id) {
    //             try {
    //                 team = await Team.findById(baller.team_id)
    //                 return res.set('x-authorization-token', token).send({user,baller,team})
    //             } catch (e) {
    //             console.log({findTeamError: e.message})
    //             }
    //         }else{
    //             return res.set('x-authorization-token', token).send({user,baller})
    //             }

    //     } catch (e)  {
    //         console.log({findBallerError: e.message})
    //     }
    
    // }
            res.set('x-authorization-token', token).send({user})
        

}