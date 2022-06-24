const mongoose = require('mongoose')

const Category = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    category: {
        type: String,
        require: true
    },
    icon: {
        type: String
    }
   
})

mongoose.model("category", Category)

