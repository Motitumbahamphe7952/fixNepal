const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  phone: {
    type: String,
    required: true,
    unique: true
  },

  email: {
    type: String
  },

  citizenshipNumber: {
    type: String
  },

  password: {
    type: String,
    required: true
  },

  role: {
    type: String,
    enum: ["citizen", "admin", "department"],
    default: "citizen"
  }

}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);