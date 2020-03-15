const mongoose = require("mongoose");
const crypto = require("crypto");

const PositionSchema = mongoose.Schema(
  {
    title: {
      type: String,
      unique: true,
      trim: true,
      required: [true, 'Please add a title']
    },
    cast_type: {
      type: String,
      enum: ["Thumbs", "Yes/No"],
      default: "Thumbs",
    },
    election: {
      type: mongoose.Types.ObjectId,
      ref: "Election"
    },
    candidates: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Candidate"
      }
    ]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Position", PositionSchema);
