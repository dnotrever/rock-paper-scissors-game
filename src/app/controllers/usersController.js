const usersModel = require('../models/Users')

class UserController {

    async registerNewUser(req, res) {

        const {username, email, password} = req.body

        const data = {username, email, password}

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
                    dataErrors.push('The password must have at least 5 characteres.')
                } 

            }

        }

        if (dataErrors.length !== 0) {
            return res.render('register',
                {dataErrors: dataErrors,
                tabName: 'Sign Up'})
        }

        await usersModel.create(data)
        return res.redirect('/customize')
        
    }

}

module.exports = new UserController()