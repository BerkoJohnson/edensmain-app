const mongoose = require("mongoose");
const crypto = require("crypto");

const CandidateSchema = mongoose.Schema(
  {
    student: {
      type: mongoose.Types.ObjectId,
      ref: "Student"
    },
    nickname: String,
    position: {
      type: mongoose.Types.ObjectId,
      ref: "Position"
    },
    photo: Buffer
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Candidate", CandidateSchema);
