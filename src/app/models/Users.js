const Sequelize = require('sequelize')
const database = require('../../config/dbConnection')

const Users = database.define('users', {

    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    username: {
        type: Sequelize.STRING,
        allowNull: false,
    },

    email: {
        type: Sequelize.STRING,
        allowNull: false,
    },

    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },

})

module.exports = Users