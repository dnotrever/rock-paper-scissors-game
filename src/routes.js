const routes = require('express').Router()
const usersController = require('./app/controllers/usersController')

routes.get('/', (req, res) => {
    res.render('home')
})

routes.get('/register', (req, res) => {
    res.render('register')
})

routes.post('/register', usersController.registerNewUser)

module.exports = routes