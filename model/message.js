const mongoose = require("mongoose");
const messageSchema = new mongoose.Schema({
    isGroup: {
        type: Boolean,
        default: false
    },
    msgType: {
        type: String
    },
    groupChatId: {
        type: mongoose.Schema.Types.ObjectId
    },
    groupName: {
        type: String

    },
    senderId: {
        type: mongoose.Schema.Types.ObjectId
    },
    senderName: { type: String },
    body: { type: String },
    caption: { type: String },
    lat: { type: Number },
    lng: { type: Number },
    timestamp: {
        type: Date
    },
    dump: {
        type: String
    }

}, {
    timestamp: true
});
const message = mongoose.model("Message", messageSchema);
module.exports = message