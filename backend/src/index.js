const express = require("express");
const admin = require("firebase-admin");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const cors = require("cors");
// taskkill /IM node.exe /F
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
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  })
);

app.get("/", async (req, res) => {
  res.send("ösyMentor!");
});

app.post("/api/v1/login", async (req, res) => {
  console.log("api geldi");
  const { idToken } = req.body; // firebase JWT token

  if (!idToken) {
    return res.status(400).json({ error: "Token bulunamadı" });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const expiresIn = 60 * 60 * 1000; // 1 SAAT
    console.log("env", process.env.NODE_ENV);
    // cookie oluştur
    res.cookie("authToken", idToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: expiresIn,
    });
    const toUser = {
      username: decodedToken.email.split("@")[0] || null,
      email: decodedToken.email || null,
      exam: "YKS SAY",
      avatar:
        decodedToken.picture ||
        "https://sm.ign.com/t/ign_ap/cover/a/avatar-gen/avatar-generations_hugw.600.jpg",
      birthdate: "",
    };
    console.log(toUser);
    res.json({ status: "success", user: toUser });
  } catch (error) {
    console.error("Token doğrulama hatası:", error);
    res.status(401).json({ error: "Geçersiz token" });
  }
});

app.get("/api/v1/user", async (req, res) => {
  const token = req.cookies.authToken; // cookie'den token al

  if (!token) {
    console.log("token bulunamadı");
    console.log(req.cookies);
    console.log(req);
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
    console.log("token var ve kullanıcı", toUser);
    res.json({ user: toUser });
  } catch (error) {
    console.error("Token doğrulama hatası:", error);
    res.status(401).json({ error: "Geçersiz token" });
  }
});

app.post("/api/v1/logout", (req, res) => {
  res.clearCookie("authToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
  });
  console.log("temiz  ");
  res.json({ status: "success" });
});
const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`Server ${PORT} portunda çalışıyor`);
});
