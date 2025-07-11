const admin = require("../config/firebase");
const User = require("../models/user.model");

exports.login = async (req, res) => {
  const idToken = req.headers.authorization?.split(" ")[1]; // Bearer token
console.log("idToken", idToken);
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
    });
  } catch (error) {
    console.error("Giriş yaparken token doğrulama hatası:", error);
    res.status(401).json({ error: "Giriş yaparken geçersiz token" });
  }
};

exports.logout = (req, res) => {
  res.json({ status: "success" });
};
