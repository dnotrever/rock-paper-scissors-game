const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const { isEmail } = require('validator')

const playerSchema = new mongoose.Schema({

    username: {
        type: String,
        required: [true, 'Username not inserted.'],
        unique: true,
    },

    email: {
        type: String,
        required: [true, 'Email not inserted.'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email.']
    },

    password: {
        type: String,
        required: [true, 'Password not inserted.'],
        minlength: [5, 'The password must have at least 5 characteres.']
    },

    plays: { type: Number },

    wins: { type: Number },

    draws: { type: Number },

    losses: { type: Number },

    avatar: { data: Buffer, contentType: String }

})

playerSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

playerSchema.statics.login = async function(username, password) {
    const player = await this.findOne({ username: username})
    if (player) {
        const auth = await bcrypt.compare(password, player.password)
        if (auth) {
            return player
        }
        throw Error('incorrect password')
    }
    throw Error('incorrect username')
}

const Player = mongoose.model('players', playerSchema)

module.exports = Player