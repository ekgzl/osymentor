const Subject = require("../models/subject.model");

exports.getSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find();
    res.json({
      status: "success",
      data: {
        subjects,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getSubject = async (req, res) => {
  try {
    // filter by examType
    const subject = await Subject.find({ examType: req.params.examType });
    res.json({
      status: "success",
      data: {
        subject,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createSubject = async (req, res) => {
  // ADMIN API KEY KONTROLÜ
  const ADMIN_API_KEY = req.headers["admin-api-key"];
  if (ADMIN_API_KEY !== process.env.ADMIN_API_KEY) {
    return res.status(401).json({ error: "Unauthorized for create subject" });
  }

  try {
    if (Array.isArray(req.body)) {
      const validSubjects = req.body.every(
        (sub) => sub.name && sub.examType && sub.maxQuestions
      );

      if (!validSubjects) {
        return res.status(400).json({ error: "Geçersiz veri formatı" });
      }

      // Toplu ekleme
      const result = await Subject.insertMany(req.body);
      return res.json({
        status: "success",
        insertedCount: result.length,
      });
    }

    // Tekil ekleme
    const subject = new Subject(req.body);
    await subject.save();
    res.json({
      status: "success",
      data: subject,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        error: Object.values(error.errors).map((e) => e.message),
      });
    }
    res.status(500).json({ error: error.message });
  }
};
