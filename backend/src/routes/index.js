const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("ösyMentor!");
});

router.use("/api/v1/auth", require("./auth.routes"));
router.use("/api/v1/user", require("./user.routes"));
router.use("/api/v1/topic", require("./topic.routes"));
router.use("/api/v1/subject", require("./subject.routes"));
router.use("/api/v1/session", require("./session.routes"));
module.exports = router;
