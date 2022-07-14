require('dotenv').config()
const jwt = require('jsonwebtoken')
const playerModel = require('../app/models/Player')

const requireAuth = (req, res, next) => {

    const token = req.cookies.jwt

    if (token) {
        jwt.verify(token, process.env.SECRET, (err) => {
            if (err) {
                console.log(err.message)
                res.redirect('/login')
            } else {
                next()
            }
        })
    } else {
        res.redirect('/login')
    }

}

const checkPlayer = (req, res, next) => {

    const token = req.cookies.jwt

    if (token) {
        jwt.verify(token, process.env.SECRET, async (err, decodedToken) => {
            if (err) {
                console.log(err.message)
                res.locals.player = null
                next()
            } else {
                const player = await playerModel.findById(decodedToken.id)
                res.locals.player = player
                next()
            }
        })
    } else {
        res.locals.player = null
        next()
    }

}

module.exports = { requireAuth, checkPlayer }