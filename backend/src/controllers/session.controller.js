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
    // filter by user and examType
    const session = await Session.find({
      user: req.params.userId,
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
