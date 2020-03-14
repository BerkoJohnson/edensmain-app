const mongoose = require("mongoose");

const SettingsSchema = mongoose.Schema(
  {
    election: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Election',
      unique: true
    },
    user: String
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Setting", SettingsSchema);
