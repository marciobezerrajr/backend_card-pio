const mongoose = require('mongoose')

require("../models/Category")
require("../models/Snack")
require("../models/User")

mongoose.connect("mongodb+srv://marcio:070794@cluster0.fawuu.mongodb.net/?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Banco conectado com sucesso")
}).catch((err) => {
    console.log("Houve um erro ao tentar conectar ao banco. Erro: " + err)
})

