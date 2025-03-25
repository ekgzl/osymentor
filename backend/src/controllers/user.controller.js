const admin = require("../config/firebase");

exports.getUser = async (req, res) => {
  const token = req.cookies.authToken;

  if (!token) {
    return res.status(401).json({ error: "Token bulunamadı" });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    const toUser = {
      username: decodedToken.email.split("@")[0] || null,
      email: decodedToken.email || null,
      exam: "YKS SAY",
      avatar:
        decodedToken.picture ||
        "https://sm.ign.com/t/ign_ap/cover/a/avatar-gen/avatar-generations_hugw.600.jpg",
      birthdate: "",
    };
    res.json({ user: toUser });
  } catch (error) {
    console.error("Token doğrulama hatası:", error);
    res.status(401).json({ error: "Geçersiz token" });
  }
};
