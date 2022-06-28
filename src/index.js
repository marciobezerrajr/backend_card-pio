const express = require('express')
const cors = require('cors')
const db = require('./database/db')

const router = express.Router()
const app = express()

const porta = process.env.PORT || 3000
const routes = require('./routes/routes.js')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/', routes)

app.use('/files', express.static('uploads'))

app.get('/', (req, res) => {
    res.send(`server on em localhost:${porta}`)
})

app.listen(porta, () => console.log(`server on em localhost:${porta}`))