const bcrypt = require('bcrypt')
const usersModel = require('../models/Users')

class UserController {

    async userRegister(req, res) {

        const {username, email, password} = req.body

        const salt = await bcrypt.genSalt(4)
        const passwordHash = await bcrypt.hash(password, salt)

        const data = {username, email, password: passwordHash}

        const dataErrors = []

        for (const [key, value] of Object.entries(data)) {

            if (key !== 'password') {

                if (value === '') {
                    const msg = `${key} not inserted.`
                    dataErrors.push(msg[0].toUpperCase() + msg.substring(1))
                }

                if (key === 'username') {
                    var dataExists = await usersModel
                    .findOne({ where: {username: value} })
                }
                    
                if (key === 'email') {
                    var dataExists = await usersModel
                    .findOne({ where: {email: value} })
                }
                
                if (dataExists !== null) {
                    const msg = `This ${key} is already used! Please enter another one.`
                    dataErrors.push(msg[0].toUpperCase() + msg.substring(1))
                }

            } else {
                if (password.length < 5) {
                    const msg = 'The password must have at least 5 characteres.'
                    dataErrors.push(msg)
                } 
            }

        }

        if (dataErrors.length !== 0) {
            const tabNameMsg = 'Sign Up'
            return res.render('register', {dataErrors: dataErrors, tabName: tabNameMsg})
        }

        await usersModel.create(data)
        return res.redirect('/login')
        
    }

    async playerLogin(req, res) {

        const {username, password} = req.body

        const dataNotInserted = {}

        if (!username) {
            const msg = 'Username not inserted.'
            dataNotInserted['userNotInserted'] = msg
        }

        if (!password) {
            const msg = 'Password not inserted.'
            dataNotInserted['passNotInserted'] = msg
        }

        const verifyNotInserted = obj => {
            return Object.keys(obj).length === 0
        }

        if (!verifyNotInserted(dataNotInserted)) {
            return res.render('login',
                {usernameError: dataNotInserted.userNotInserted,
                passwordError: dataNotInserted.passNotInserted,
                tabName: 'Login'})
        }

        const playerExists = await usersModel
            .findOne({ where: {username: username} })

        if (playerExists) {

            const checkPassword = await bcrypt.compare(password, playerExists.password)

            if (!checkPassword) {
                const msg = 'The password is incorrect!'
                return res.render('login', {passwordNotMatch: msg})
            } else {
                return res.redirect('/profile')
            }

        } else {
            const msg = 'Player not registered!'
            return res.render('login', {playerNotFound: msg})
        }

    }

}

module.exports = new UserController()