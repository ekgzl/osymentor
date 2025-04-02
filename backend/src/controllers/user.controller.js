const admin = require("../config/firebase");
const User = require("../models/user.model");

exports.getUser = async (req, res) => {
  const token = req.cookies.authToken;

  if (!token) {
    return res
      .status(401)
      .json({ error: "Kullanıcı getirirken token bulunamadı." });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    const user = await User.findOne({ email: decodedToken.email });
    if (!user) {
      return res.status(404).json({ error: "Kullanıcı bulunamadı." });
    }
    res.json({
      user: {
        username: user.username,
        email: user.email,
        exam: user.exam,
        avatar: user.avatar,
        birthdate: user.birthdate,
      },
    });
  } catch (error) {
    console.error("Kullanıcı getirirken token doğrulama hatası:", error);
    res.status(401).json({ error: "Kullanıcı getirirken geçersiz token" });
  }
};

exports.setUser = async (req, res) => {
  const token = req.cookies.authToken;
  const { username, email, exam, avatar, birthdate } = req.body;
  if (!token) {
    return res.status(401).json({ error: "Set ederken token bulunamadı." });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    if (!username || !email || !exam || !avatar) {
      console.log(username, email, exam, avatar);
      return res.status(400).json({ error: "Tüm alanlar doldurulmalıdır" });
    }
    const user = await User.findOneAndUpdate(
      { uid: decodedToken.uid },
      { username, exam, avatar, birthdate: birthdate || null, email: email },
      { new: true }
    );
    if (!user) {
      return res
        .status(404)
        .json({ error: "Set ederken kullanıcı bulunamadı." });
    }
    res.json({
      status: "success",
      user: {
        email: user.email,
        username: user.username,
        avatar: user.avatar,
        exam: user.exam,
        birthdate: user.birthdate,
      },
    });
  } catch (error) {
    console.error("Kullanıcı set ederken token doğrulama hatası:", error);
    res.status(401).json({ error: "Set ederken Geçersiz token" });
  }
};
