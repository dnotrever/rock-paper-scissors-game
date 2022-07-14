require('dotenv').config()
const jwt = require('jsonwebtoken')
const playerModel = require('../models/Player')

class PlayerController {

    handleErrors = err => {

        // console.log(err)

        let errors = {username: '', email: '', password: ''}

        if (err.message === 'incorrect username') {
            errors.username = 'That player is not registered!'
        }

        if (err.message === 'incorrect password') {
            errors.password = 'That password is incorrect!'
        }

        if (err.code === 11000) {
            errors.username = 'That username is already used!'
        }

        if (err.code === 11000) {
            errors.email = 'That email is already used!'
        }

        if (err.message.includes('players validation failed')) {
            Object.values(err.errors).forEach(({properties}) => {
                errors[properties.path] = properties.message
            })
        }

        return errors
        
    }

    createToken = id => {
        return jwt.sign({ id },
            process.env.SECRET,
            { expiresIn: 3600000 })
    }

    async playerSignup(req, res) {

        const { username, email, password } = req.body
        
        try {

            const data = {username, email, password}

            const player = await playerModel.create(data)

            const token = new PlayerController().createToken(player._id)

            res.cookie('jwt', token, { httpOnly: true, maxAge: 3600000 })

            res.status(201).json({ player: player._id })

        }
        
        catch (err) {

            const validateErrors = new PlayerController().handleErrors(err)

            res.status(400).json(validateErrors)

        }

    }

    async playerLogin(req, res) {

        const {username, password} = req.body

        try {

            const player = await playerModel.login(username, password)

            const token = new PlayerController().createToken(player._id)

            res.cookie('jwt', token, { httpOnly: true, maxAge: 3600000 })

            res.status(201).json({ player: player._id })

        }

        catch (err) {

            const validateErrors = new PlayerController().handleErrors(err)

            res.status(400).json(validateErrors)

        }

    }

    playerLogout(req, res) {

        res.cookie('jwt', '', { maxAge: 1 })

        res.redirect('/')

    }

    async playerPlays(req, res) {

        const playerId = req.body.id

        const { plays, wins, draws, losses } = req.body
    
        const player = await playerModel.findOne({ _id:playerId })

        const newStatPlay = player.plays + plays
        const newStatWin = player.wins + wins
        const newStatDraws = player.draws + draws
        const newStatLosses = player.losses + losses

        await playerModel.updateOne({_id:playerId}, {
            plays:newStatPlay, wins:newStatWin, draws:newStatDraws, losses:newStatLosses
        })

    }
    
}

module.exports = new PlayerController()