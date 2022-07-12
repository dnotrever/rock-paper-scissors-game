const routes = require('express').Router()
const playerController = require('./app/controllers/playerController')
const { requireAuth } = require('./middleware/middleware')

// GET

routes.get('/', (_, res) => {
    res.render('home', {tabName: 'Welcome!'})
})

routes.get('/signup', (_, res) => {
    res.render('signup', {tabName: 'Sign Up'})
})

routes.get('/login', (_, res) => {
    res.render('login', {tabName: 'Login'})
})

routes.get('/profile', requireAuth, (_, res) => {
    res.render('profile', {tabName: 'profile'})
})

routes.get('/logout', playerController.playerLogout)

// POST

routes.post('/signup', playerController.playerSignup)

routes.post('/login', playerController.playerLogin)

module.exports = routes