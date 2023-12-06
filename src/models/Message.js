const mongoose = require("../database/index");
const User = require("./User");

const MessageSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
    required: true,
  },
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Message = mongoose.model("Message", MessageSchema);

module.exports = Message;
