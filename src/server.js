require('dotenv').config()
const app = require('./app')
const PORT = process.env.PORT || 3000

app.disable('x-powered-by')

app.listen(PORT, () => {
    console.log(`\nServer running on http://localhost:${PORT}/\n`)
})