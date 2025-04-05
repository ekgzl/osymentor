const mongoose = require("mongoose");

const SessionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  examType: {
    type: String,
    enum: ["TYT", "AYT", "KPSS"],
    required: true,
  },
  subjects: [
    {
      subject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subject",
        required: true,
      },
      topics: [
        {
          topic: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Topic",
          },
          solvedQuestions: {
            type: Number,
            min: 0,
            default: 0,
          },
        },
      ],
      totalSolved: {
        type: Number,
        min: 0,
        default: 0,
      },
      duration: {
        type: Number,
        min: 1,
      },
    },
  ],
  totalDuration: {
    type: Number,
    min: 1,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Session", SessionSchema);
