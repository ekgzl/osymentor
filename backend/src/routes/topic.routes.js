const express = require("express");
const router = express.Router();
const topicController = require("../controllers/topic.controller");

router.get("/", topicController.getTopics);
router.post("/", topicController.createTopic);
router.get("/:subject", topicController.getTopic);

module.exports = router;
