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

routes.get('/ranking', playerController.playerAll)

routes.get('/logout', requireAuth, playerController.playerLogout)

routes.get('/profile', requireAuth, (req, res) => {
    res.render('profile')
})

routes.get('/game', requireAuth, (req, res) => {
    res.render('game')
})

routes.get('/edit-account', requireAuth, (req, res) => {
    res.render('edit-account')
})

routes.get('/change-avatar', requireAuth, (req, res) => {
    res.render('change-avatar')
})

routes.get('/delete-account', requireAuth, (req, res) => {
    res.render('delete-account')
})

routes.get('/player-removed', requireAuth, (req, res) => {
    res.render('player-removed', {layout: 'player-removed'})
})

// POST

routes.post('*', checkPlayer)

routes.post('/signup', playerController.playerSignup)

routes.post('/login', playerController.playerLogin)

routes.post('/game', playerController.playerPlays)

routes.post('/edit-account', playerController.playerSettings)

routes.post('/avatar-changed', playerController.playerAvatar)

routes.post('/player-removed', playerController.playerRemove)

module.exports = routes