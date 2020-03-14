const mongoose = require("mongoose");

const StudentSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true
    },
    gender: {
      type: String,
      enum: ['Male', 'Female']
    },
    room: {
      type: String,
      required: true
    },
    studentID: {
      type: String,
      trim: true,
      match: /^ATS[0-9]{6}/
    },
    photo: Buffer,
    isCandidate: Boolean,
    candidate: {
      type: mongoose.Types.ObjectId,
      ref: "Candidate"
    },
    hash: String,
    salt: String
  },
  {
    timestamps: true
  }
);

StudentSchema.methods.hashPassword = function(password) {
  this.salt = crypto.randomBytes(16).toString("hex");
  this.hash = crypto
    .pbkdf2Sync(password, this.salt, 10000, 512, "sha512")
    .toString("hex");
};

StudentSchema.methods.verifyPassword = function(password) {
  const hashed = crypto
    .pbkdf2Sync(password, this.salt, 10000, 512, "sha512")
    .toString("hex");

  if (this.hash === hashed) {
    return true;
  } else {
    return false;
  }
};

module.exports = mongoose.model("Student", StudentSchema);
