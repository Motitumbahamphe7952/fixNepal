const mongoose = require("mongoose");

const departmentSchema = mongoose.Schema({
    name: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
    },
    categories: [
      {
        type: String,
      },
    ],
    complaints:[
      {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Complaint",
      }
    ]
  },
  { timestamps: true },
);

module.exports = mongoose.model("Department", departmentSchema);
