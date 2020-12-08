const User = require('./../models/userSchema')
const client= require('./../client/client')

//console.log(client)

module.exports.checkUser = (req,res,next)=>{
    const {first_name,
        last_name,
        username,
        birth_date,
        email,
        role,
        password,
        last_password_reset,
        last_login,profilePic} = req.body;
        
    const userData = {
        first_name,
        last_name,
        username,
        birth_date,
        email,
        role,
        password,
        last_password_reset,
        last_login,
        profilePic
    };

    const newUser= new User(userData)
    newUser.save(function (err) {
        if(err){
            if(err.errors.username){
                return res.send(err.errors.username.message)
            }
        return res.send(err)
        }

    });

    next()
   
    // if(err){
    //     res.send(err)
    //     res.send('username not available')
    //     res.render('error',{message: err.message,error:err})
    //     //redirect user to registration
    // }
    // try{
    //     User.create(newUser)
    //     next();
    // }catch(err){
    //     res.render('error',{message: err.message,error:err})
    // }
    
    //client.users.insert(newUser)
    //console.log(newUser)
    
    // newUser.save(function(err){
    //     if (err) console.log(err)
    // })
    
}