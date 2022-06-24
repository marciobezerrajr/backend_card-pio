const mongoose = require("mongoose");

const Snack = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    value: {
        type: Number,
        required: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'category', required: true
    },
    image: {
        type: String,
        required: true
    }
})

mongoose.model('snack', Snack)
