const jwt = require('jsonwebtoken')
require('dotenv').config();

const handleJwt = (req, res, next) => {
    const header = req.headers.authorization || req.headers.Authorization;
    if(!header || !header?.startsWith('Bearer ')) return res.sendStatus(401);

    const token = header.split(' ')[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if(err) return res.status(403).json({error: 'invalid token'})
        req.username = decoded.userInfo.username
        next();
    })

}

module.exports = handleJwt