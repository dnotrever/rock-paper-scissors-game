const routes = require('express').Router()
const playerController = require('./app/controllers/playerController')
const { requireAuth, checkPlayer } = require('./middleware/middleware')


// GET

routes.get('*', checkPlayer)

routes.get('/', (req, res) => {
    res.render('home')
})

routes.get('/signup', (req, res) => {
    res.render('signup')
})

routes.get('/login', (req, res) => {
    res.render('login')
})

routes.get('/profile', requireAuth, (req, res) => {
    res.render('profile')
})

routes.get('/logout', playerController.playerLogout)

// POST

routes.post('/signup', playerController.playerSignup)

routes.post('/login', playerController.playerLogin)

module.exports = routes