const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("ösyMentor!");
});

router.use("/api/v1/auth", require("./auth.routes"));
router.use("/api/v1/user", require("./user.routes"));

module.exports = router;
