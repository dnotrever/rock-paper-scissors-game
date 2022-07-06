const routes = require('express').Router()
const usersController = require('./app/controllers/usersController')

routes.get('/', (_, res) => {
    res.render('home', {tabName: 'Home'})
})

routes.get('/register', (_, res) => {
    res.render('register', {tabName: 'Sign Up'})
})

routes.get('/customize', (_, res) => {
    res.render('customize', {tabName: 'Customize'})
})

routes.get('/login', (_, res) => {
    res.render('login', {tabName: 'Login'})
})

routes.post('/register', usersController.registerNewUser)

module.exports = routes