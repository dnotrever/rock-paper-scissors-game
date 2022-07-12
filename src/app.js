const cookieParser = require('cookie-parser')
const express = require('express')
const routes = require('./routes')

class App {

    constructor() {
        this.app = express()
        this.middlewares()
        this.routes()
    }

    middlewares() {
        this.app.use(express.json())
        this.app.use(express.urlencoded({extended: true}))
        this.app.use(express.static(__dirname + '/public'))
        this.app.use(cookieParser())
    }

    routes() {
        this.app.use(routes)
    }

}

module.exports = new App().app