const User = require('./../models/userSchema')
const client= require('./../client/client')
const bcrypt= require('bcrypt')

//console.log(client)

module.exports.register = async (req,res)=>{
    const {first_name,
        last_name,
        username,
        birth_date,
        email,
        role,
        password,
        last_password_reset,
        last_login,
        profilePic
    } = req.body;

    // const newUser= new User(userData)
    console.log(password)

    try {
        console.log('hallooooooooooo')
        let user = await User.findOne({ username })
        if (user) return res.status(400).send('This user already exists')
        // student = await Student.create({ first_name, last_name, course, email, password })
        // user = new User({ first_name, last_name, course, email, password: await bcrypt.hash(password, 10) })
        user = new User({first_name,
            last_name,
            username,
            birth_date,
            email,
            role,
            password: await bcrypt.hash(password, 10),
            last_password_reset,
            last_login,profilePic
        })
        
        await user.save()
        const token = user.createToken()
        res.set('x-authorization-token', token).send({ _id: user._id, username: user.username})
      } catch(e) {
        console.error(e.message)
      }
   
     
}