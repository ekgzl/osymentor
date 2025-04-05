const mongoose = require("mongoose");

const SubjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    enum: [
      "Türkçe",
      "Matematik",
      "Geometri",
      "Fizik",
      "Kimya",
      "Biyoloji",
      "Tarih",
      "Coğrafya",
      "Felsefe",
      "Din",
      "Edebiyat",
      "Tarih-1",
      "Coğrafya-1",
    ],
  },
  examType: {
    type: String,
    required: true,
    enum: ["TYT", "AYT-EA", "AYT-SAY", "KPSS"],
  },
  maxQuestions: {
    type: Number,
    required: true,
    min: 0,
  },
});

const Subject = mongoose.model("Subject", SubjectSchema);

module.exports = Subject;
