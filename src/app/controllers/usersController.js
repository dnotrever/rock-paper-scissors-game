const usersModel = require('../models/Users')

class UserController {

    async registerNewUser(req, res) {

        const {username, email, password} = req.body

        const data = {username, email, password}

        const exists = await usersModel.findOne(
            {where: {username: username}}
        )

        if (exists) {
            return res.status(422).json({
                error: 'Already exists!'
            })
        }

        await usersModel.create(data)

        return res.status(201).json({
            success: "Successfully registered user!"
        })
            
    }

}

module.exports = new UserController()