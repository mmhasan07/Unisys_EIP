const mongoose = require("mongoose");

const DataSchema = new mongoose.Schema({
    publishedByUsername: {
        type: String,
        required: true,
    },
    publishedByOrganization: {
        type: String,
        required: true,
    },
    channelName: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
        required: false,
    },
    seenBy: {
        type: [String],
        required: false,
        default: []
    },
    data: {
        type: mongoose.Schema.Types.Mixed,
        default: {},
        required: true,
    }
});

module.exports = mongoose.model("data", DataSchema);
