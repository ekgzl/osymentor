const admin = require("../config/firebase");
const User = require("../models/user.model");

exports.login = async (req, res) => {
  const { idToken } = req.body;

  if (!idToken) {
    return res.status(400).json({ error: "Giriş yaparken token bulunamadı." });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const expiresIn = 60 * 60 * 1000;

    // cookie oluştur ve tarayıcıya göm
    res.cookie("authToken", idToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: expiresIn,
    });

    // kullanıcıyı veritabanından getir
    let user = await User.findOne({ email: decodedToken.email });
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

exports.setUser = async (req, res) => {
  const token = req.cookies.authToken;
  const { username, email, exam, avatar, birthdate } = req.body;
  if(!token){
    return res.status(401).json({ error: "Set ederken token bulunamadı." });
  }
  
  try {    
    const decodedToken = await admin.auth().verifyIdToken(token);
    if (!username || !email || !exam || !avatar || !birthdate) {
    return res.status(400).json({ error: "Tüm alanlar doldurulmalıdır" });
  }
  const user = await User.findOneAndUpdate({ email: decodedToken.email }, { username, exam, avatar, birthdate },
    { new: true }
  );
  if(!user){
    return res.status(404).json({ error: "Set ederken kullanıcı bulunamadı." });
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
}