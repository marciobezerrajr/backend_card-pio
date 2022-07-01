const express = require('express')
const cors = require('cors')
const morgan = require('morgan-body')
const moment = require('moment')
const path = require('path')
const fs = require('fs')
require('./database/db')

const app = express()

const porta = process.env.PORT || 3000
const router = require('./routes/routes.js')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


var date = new Date().toJSON().slice(0,10).split('-').reverse().join('.')
const log = fs.createWriteStream(
    path.join(__dirname, "/logs", `${date}_express.log`), { flags: "a" })

morgan(app, {
    noColors: true,
    stream: log
})

app.use('/', router)
app.use('/files', express.static('uploads'))

app.get('/', (req, res) => {
    res.send(`server on em localhost:${porta}`)
})

app.listen(porta, () => console.log(`server on em localhost:${porta}`))