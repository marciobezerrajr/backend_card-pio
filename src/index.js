const express = require('express')
const bcrypt = require('bcrypt');

const db = require('./database/db')

const router = express.Router()
const cors = require('cors')
const app = express()

//const routes = require('./routes/routes.js')

const porta = process.env.PORT || 3000

app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(router)

app.get('/', (req, res) => {
    res.send(//`server on em localhost:${porta}
    `<DESCRIPTION>Olá Mudo</DESCRIPTION>`)
})

//app.use('/', routes)

app.listen(porta, () => { console.log(`server on em localhost:${porta}`) })