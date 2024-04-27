const mongoose = require("mongoose");

const ChannelSchema = new mongoose.Schema({
  channelName: {
    type: String,
    required: true,
    unique: true,
  },
  authorizedOrganizations: {
    type: [String],
    required: true,
    default: []
  }
});

module.exports = mongoose.model("channels", ChannelSchema);
