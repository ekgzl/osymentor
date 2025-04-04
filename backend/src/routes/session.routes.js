const express = require("express");
const router = express.Router();
const sessionController = require("../controllers/session.controller");

router.post("/", sessionController.createSession);
router.get("/:userId", sessionController.getSession);

module.exports = router;
