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

            let keyPattern = Object.keys(err.keyPattern)[0]

            if (keyPattern === 'username') {
                errors.username = 'That username is already used!'
            }

            if (keyPattern === 'email') {
                errors.email = 'That email is already used!'
            }

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

        res.redirect('/login')

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

    async playerSettings(req, res) {

        const { id, username, email, password } = req.body

        const player = await playerModel.findOne({ _id:id })

        const messages = {
            usernameSuccess: '',
            emailSuccess: '',
            passwordSuccess: '',
            usernameError: '',
            emailError: '',
            passwordError: ''
        }

        if (username && username !== player.username) {

            const checkUsername = await playerModel.findOne({ username: username })
            
            if (checkUsername === null) {
                await playerModel.updateOne({_id:id}, {username:username})
                messages.usernameSuccess = 'Successfully username changed!'
            } else {
                messages.usernameError = 'That username is already used!'
            }

        }

        if (email && email !== player.email) {

            const checkemail = await playerModel.findOne({ email: email })
            
            if (checkemail === null) {
                await playerModel.updateOne({_id:id}, {email:email})
                messages.emailSuccess = 'Successfully email changed!'
            } else {
                messages.emailError = 'That email is already used!'
            }

        }

        if (password) {
            if (password.length >= 5) {
                await playerModel.updateOne({_id:id}, {password:password})
                messages.passwordSuccess = 'Successfully password changed!'
            } else {
                messages.passwordError = 'The password must have at least 5 characteres.'
            }
        }

        res.json({ messages })

    }

    async playerRemove(req, res) {

        const id = req.body.id

        await playerModel.findByIdAndRemove({ _id:id })

        setTimeout(() => {
            res.redirect('/')
        }, 5000)

    }

    async playerAll(req, res) {

        const result = await playerModel.find({})

        const sortingPlayers = result.sort((a, b) => b.wins - a.wins)

        res.render('ranking', {
            result: sortingPlayers,
            noPlayers: "There're no registered players yet."
        })

    }
    
}

module.exports = new PlayerController()