const express = require('express')
const cors = require('cors')
const morgan = require('morgan-body')
const path = require('path')
const fs = require('fs')
const session = require('express-session')
const passport = require("passport")
const helmet = require("helmet")

require('./database/db')
require('./config/auth')(passport)

const router = require('./routes/routes.js')

const app = express()

const porta = process.env.PORT || 3000

app.use(helmet());
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

var today = new Date().toJSON().slice(0,10).split('-').reverse().join('.')
const log = fs.createWriteStream(path.join(__dirname, "/logs", `${today}_express.log`), { flags: "a" })

morgan(app, {
    noColors: true,
    stream: log
})

app.use(session({
    secret: process.env.SECRET_SESSION,
    cookie: {maxAge: 3000000},
    resave: true,
    saveUninitialized: true,
}))

app.use(passport.initialize())
app.use(passport.session())

app.use('/', router)
app.use('/files', express.static(path.join(__dirname,'uploads')))

app.get('/', (req, res) => {
    res.send(`server on em localhost:${porta}`)
})

app.listen(porta, () => console.log(`server on em localhost:${porta}`))