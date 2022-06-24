const mongoose = require("mongoose");

require("dotenv").config();
require("../models/Category");
require("../models/Snack");
require("../models/User");

mongoose
  .connect(`${process.env.MONGO_URL}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Banco conectado com sucesso");
  })
  .catch((err) => {
    console.log("Houve um erro ao tentar conectar ao banco. Erro: " + err);
  });
