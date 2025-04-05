const admin = require("../config/firebase");
const User = require("../models/user.model");

exports.login = async (req, res) => {
  const { idToken } = req.body;

  if (!idToken) {
    return res.status(400).json({ error: "Giriş yaparken token bulunamadı." });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    //if email verification is not done
    if (!decodedToken.email_verified) {
      console.log(decodedToken.email_verified);
      return res.status(401).json({
        error: "Giriş yaparken e-posta doğrulanmamış.",
      });
    }
    const expiresIn = 60 * 60 * 1000;

    // cookie oluştur ve tarayıcıya göm
    res.cookie("authToken", idToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: expiresIn,
    });

    // kullanıcıyı veritabanından getir
    let user = await User.findOne({ uid: decodedToken.uid });
    //ilk kayıtta kullanıcı kaydetmek için
    if (!user) {
      user = new User({
        uid: decodedToken.uid,
        email: decodedToken.email,
        username: decodedToken.email.split("@")[0],
        avatar: decodedToken.picture,
      });
      await user.save();
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
    console.error("Giriş yaparken token doğrulama hatası:", error);
    res.status(401).json({ error: "Giriş yaparken geçersiz token" });
  }
};

exports.logout = (req, res) => {
  // cookie temizle
  res.clearCookie("authToken", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
  });
  res.json({ status: "success" });
};
