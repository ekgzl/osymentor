const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  uid: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    unique: true,
  },
  exam: {
    type: String,
    default: "YKS SAY",
    required: true,
  },
  avatar: {
    type: String,
    default:
      "https://sm.ign.com/t/ign_ap/cover/a/avatar-gen/avatar-generations_hugw.600.jpg",
    required: true,
  },
  birthdate: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", userSchema);
