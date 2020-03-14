const mongoose = require("mongoose");
const crypto = require("crypto");

const UserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Please provide a name"],
      maxlength: [60, "Name cannot be more than 60 characters"]
    },
    email: {
      type: String,
      unique: [true, "Email already exists"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please add a valid email"
      ]
    },
    hash: String,
    salt: String,
    isAdmin: {
      type: String,
      enum: ["Admin", "User", "Officer"],
      default: "User"
    },
    photo: Buffer
  },
  {
    timestamps: true
  }
);

UserSchema.methods.hashPassword = function(password) {
  this.salt = crypto.randomBytes(16).toString("hex");
  this.hash = crypto
    .pbkdf2Sync(password, this.salt, 10000, 512, "sha512")
    .toString("hex");
};

UserSchema.methods.verifyPassword = function(password) {
  const hashed = crypto
    .pbkdf2Sync(password, this.salt, 10000, 512, "sha512")
    .toString("hex");

  if (this.hash === hashed) {
    return true;
  } else {
    return false;
  }
};

module.exports = mongoose.model("User", UserSchema);
