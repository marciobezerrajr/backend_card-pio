const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Category = new Schema({
    name: {
        type: String,
        require: true
    },
    category: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

mongoose.model("category", Category)

