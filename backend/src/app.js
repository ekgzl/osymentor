//app.js express uygulamasının kurulu olduğu yer
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const corsOptions = require("./config/cors");
const routes = require("./routes");
const connectDB = require("./config/mongo");

//mongodb bağlantısı
connectDB();

const app = express();

// Middleware'ler
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));

// Route'lar
app.use(routes);

module.exports = app;
