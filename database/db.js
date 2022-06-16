const mongoose = require('mongoose')
const dotenv = require('dotenv')

const result = dotenv.config()

require("../models/Category")
require("../models/Snack")
require("../models/User")

mongoose.connect(`mongodb+srv://${result.parsed.MONGO_USER}:${result.parsed.MONGO_PASS}@cluster0.fawuu.mongodb.net/?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Banco conectado com sucesso")
}).catch((err) => {
    console.log("Houve um erro ao tentar conectar ao banco. Erro: " + err)
})

