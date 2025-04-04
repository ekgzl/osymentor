const mongoose = require("mongoose");

const TopicSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subject",
    required: true,
  },
});

const Topic = mongoose.model("Topic", TopicSchema);

module.exports = Topic;
