require('dotenv').config()
const Sequelize = require('sequelize')

class Connection {

    constructor() {
        this.connectMySQL()
    }

    connectMySQL() {
        this.mysqlConnection = new Sequelize(
            process.env.DB_NAME,
            process.env.DB_ROOT,
            process.env.DB_PASS,
            {
                dialect: 'mysql',
                host: process.env.DB_HOST,
                port: process.env.DB_PORT
            }
        )
    }

}

module.exports = new Connection().mysqlConnection