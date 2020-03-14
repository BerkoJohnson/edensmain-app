const mongoose = require("mongoose");

const ElectionSchema = mongoose.Schema(
  {
    title: {
      type: String,
      unique: true,
      trim: true
    },
    school: {
      type: String,
      trim: true
    },
    academicYear: {
      type: String,
      default: '2020/2021'
    },
    positions: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Position"
      }
    ]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Election", ElectionSchema);
