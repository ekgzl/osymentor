const admin = require("../config/firebase");

exports.login = async (req, res) => {
  const { idToken } = req.body;

  if (!idToken) {
    return res.status(400).json({ error: "Token bulunamadı" });
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

    const tempUser = {
      username: decodedToken.email.split("@")[0] || null,
      email: decodedToken.email || null,
      exam: "YKS SAY",
      avatar:
        decodedToken.picture ||
        "https://sm.ign.com/t/ign_ap/cover/a/avatar-gen/avatar-generations_hugw.600.jpg",
      birthdate: "",
    };

    res.json({ status: "success", user: tempUser });
  } catch (error) {
    console.error("Token doğrulama hatası:", error);
    res.status(401).json({ error: "Geçersiz token" });
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
