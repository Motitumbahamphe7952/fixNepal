const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },

  description: {
    type: String
  },

  category: {
    type: String,
    enum: [
      "road",
      "garbage",
      "water",
      "electricity",
      "streetlight",
      "drainage",
      "corruption"
    ],
    required: true,
  },

  location: {
    type: {
      type: String,
      enum: ["Point"],
      default: "Point"
    },
    coordinates: {
      type: [Number]   // [longitude, latitude]
    }
  },

  imageUrl: {
    type: String,
  },

  status: {
    type: String,
    enum: [
      "submitted",
      "under_review",
      "assigned",
      "in_progress",
      "resolved"
    ],
    default: "submitted"
  },

  priority: {
    type: String,
    enum: ["low", "medium", "high"],
    default: "medium"
  },

  reportedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

 

}, { timestamps: true });


module.exports = mongoose.model("Complaint", complaintSchema);