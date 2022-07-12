require('dotenv').config()

const app = require('./app')
const database = require('./config/dbConnection')

const path = require('path')
const PORT = process.env.PORT || 3000

app.disable('x-powered-by')

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './app/views'))

app.listen(PORT, () => {

    database
        .then( _ => {
            console.log('\nMongoDB Connected!')
            console.log(`\nServer running on http://localhost:${PORT}/\n`)
        })
        .catch(err => {
            console.log(`\n${err}\n`)
        })
        
})