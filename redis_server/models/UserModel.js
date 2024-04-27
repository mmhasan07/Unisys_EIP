const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    min: 3,
    max: 20,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    max: 50,
  },
  organization: {
    type: String,
    unique: false,
    required: true,
  },
  subscribedChannels: {
    type: [String],
    default: ["EIP"]
  },
  password: {
    type: String,
    required: true,
    min: 8,
  },
});

module.exports = mongoose.model("users", UserSchema);
