const corsOptions = {
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true,
  methods: "GET,POST,PUT,DELETE",
};

module.exports = corsOptions;
