require('dotenv').config()
const mongoose = require('mongoose')

class Connection {

    constructor() {
        this.connectMongoDB()
    }

    connectMongoDB() {

        const dbPass = process.env.DB_PASS
        const dbName = process.env.DB_NAME
        const dbCluester = process.env.DB_CLUSTER

        const dbURI = `mongodb+srv://${dbName}:${dbPass}@${dbCluester}.9lmpx.mongodb.net/?retryWrites=true&w=majority`

        this.mongodbConnection = mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})

    }

}

module.exports = new Connection().mongodbConnection