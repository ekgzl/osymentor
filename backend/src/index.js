const express = require("express");
const admin = require("firebase-admin");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const cors = require("cors");

//json file
const serviceAccount = {
  //from .env
  type: process.env.FIREBASE_TYPE,
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_CLIENT_ID,
  auth_uri: process.env.FIREBASE_AUTH_URI,
  token_uri: process.env.FIREBASE_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5175", // Frontend URL'si
    credentials: true, // Cookie'leri göndermek için
  })
);

// Token doğrulama ve cookie oluşturma
app.post("/api/v1/login", async (req, res) => {
  const { idToken } = req.body; // Firebase'den gelen JWT token'ı

  if (!idToken) {
    return res.status(400).json({ error: "Token bulunamadı" });
  }

  try {
    // Token'ı doğrula
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const expiresIn = 60 * 1000; // 1 dakika

    // Cookie oluştur
    res.cookie("authToken", idToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // HTTPS için
      sameSite: "strict",
      maxAge: expiresIn,
    });
    const toUser = {
      username: decodedToken.email.split("@")[0] || "defaultUsername",
      email: decodedToken.email || "defaultEmail",
      exam: "YKS SAY", // Varsayılan değer
      avatar: decodedToken.picture || "https://example.com/default-avatar.png", // Varsayılan avatar
      birthdate: "", // Varsayılan değer
    };
    res.json({ status: "success", user: toUser });
  } catch (error) {
    console.error("Token doğrulama hatası:", error);
    res.status(401).json({ error: "Geçersiz token" });
  }
});

app.get("/api", (req, res) => {
  res.json({ message: "Hello, World!" });
});

// Kullanıcı bilgilerini getir
app.get("/api/v1/user", async (req, res) => {
  const token = req.cookies.authToken; // Cookie'den token'ı al

  if (!token) {
    return res.status(401).json({ error: "Token bulunamadı" });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    const toUser = {
      username: decodedToken.email.split("@")[0] || "defaultUsername",
      email: decodedToken.email || "defaultEmail",
      exam: "YKS SAY",
      avatar: decodedToken.picture || "https://example.com/default-avatar.png",
      birthdate: "",
    };
    res.json({ user: toUser });
  } catch (error) {
    console.error("Token doğrulama hatası:", error);
    res.status(401).json({ error: "Geçersiz token" });
  }
});

// Çıkış yap
app.post("/api/v1/logout", (req, res) => {
  res.clearCookie("authToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
  res.json({ status: "success" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server ${PORT} portunda çalışıyor`);
});
