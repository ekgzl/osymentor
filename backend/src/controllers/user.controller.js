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
