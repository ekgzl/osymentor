const Session = require("../models/session.model");
const admin = require("../config/firebase");

exports.createSession = async (req, res) => {
  const token = req.cookies.authToken;

  if (!token) {
    return res
      .status(401)
      .json({ error: "Session gelirken token bulunamadı." });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    if (!decodedToken) {
      return res.status(401).json({ error: "Geçersiz token" });
    }
    const session = new Session(req.body);
    await session.save();
    res.json({
      status: "success",
      data: {
        session,
      },
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

exports.getSession = async (req, res) => {
  try {
    // filter by user
    const session = await Session.find({
      user: req.params.user,
    });
    res.json({
      status: "success",
      data: {
        session,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getSessionForDurationChart = async (req, res) => {
  try {
    // Kullanıcının tüm oturumlarını bul
    const sessions = await Session.find({
      user: req.params.user,
    }).lean(); // .lean() ile plain JavaScript objesi olarak al

    // Her oturumu işleyerek gerekli verileri çıkar
    const formattedSessions = sessions.map((session) => ({
      date: session.date,
      totalDuration: session.totalDuration,
      totalSolved: session.subjects.reduce(
        (sum, subject) => sum + (subject.totalSolved || 0),
        0
      ),
    }));

    res.json({
      status: "success",
      data: {
        sessions: formattedSessions,
      },
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
      stack: error.stack, // Hata detayı için
    });
  }
};

exports.demoSession = async (req, res) => {
  try {
    if (Array.isArray(req.body)) {
      const validSessions = req.body.every(
        (sub) =>
          sub.user &&
          sub.examType &&
          sub.totalDuration &&
          sub.subjects &&
          sub.date
      );
      if (!validSessions) {
        return res.status(400).json({ error: "Geçersiz veri formatı" });
      }

      //toplu ekleme
      const result = await Session.insertMany(req.body);
      return res.json({
        status: "success",
        insertedCount: result.length,
      });
    }
    // Tekil ekleme
    const session = new Session(req.body);
    await session.save();
    res.json({
      status: "success",
      data: {
        session,
      },
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
