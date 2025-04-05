const express = require("express");
const router = express.Router();
const sessionController = require("../controllers/session.controller");

router.post("/", sessionController.createSession);
router.get("/:user", sessionController.getSession);
router.post("/demo", sessionController.demoSession);
router.get(
  "/duration-chart/:user",
  sessionController.getSessionForDurationChart
);
module.exports = router;
