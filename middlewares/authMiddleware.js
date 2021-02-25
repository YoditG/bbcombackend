const jwt = require('jsonwebtoken')

const authorizeUser = (req, res, next) => {
    const authHeader = req.headers.authorization
    const token = authHeader && authHeader.split(' ')[1]
    //console.log(token)
    if (!token) return res.status(401).send('You shall not pass!')

    //console.log("hallo, hier bin ich")

    jwt.verify(token, process.env.MY_SECRET, (err, payload) => {
        if (err) return res.status(403).send('Invalid token!')
        //req.userPayload = payload
        next();
    })
}

module.exports = authorizeUser