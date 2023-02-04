const express = require('express')
const router = express.Router()
const User = require('../models/index').User

router.post('/', async (req, res) => {
    const cookies = req.cookies;
    if(!cookies?.loginCookie) res.status(203).json({msg: 'User logged out'});
    const token = cookies.loginCookie;
    console.log(token)

    try {
        const foundUser = await User.findOne({
            where: {
                refreshToken: token
            }
        })
        if(!foundUser){
            res.clearCookie('loginCookie', {
                 httpOnly: true
            })
            return res.sendStatus(200)
        }
        foundUser.refreshToken = '';
        await foundUser.save();
        res.clearCookie('loginCookie', {
            httpOnly: true
        })
        return res.status(200).json(foundUser)
    } catch (error) {
        return res.status(400).json({
            error: error
        })
    }

})

module.exports = router