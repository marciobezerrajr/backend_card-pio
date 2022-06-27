const mongoose = require("mongoose");

const User = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Number,
    default: 0,
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("user", User);
