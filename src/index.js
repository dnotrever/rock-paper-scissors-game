const express = require('express')
const routes = require('./routes')

require('./config/dbConnection')

class App {

    constructor() {
        this.app = express()
        this.middlewares()
        this.routes()
    }

    middlewares() {
        this.app.use(express.json())
        this.app.use(express.urlencoded({extended: true}))
    }

    routes() {
        this.app.use(routes)
    }

}

module.exports = new App().app