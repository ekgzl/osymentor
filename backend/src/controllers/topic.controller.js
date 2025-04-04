const Topic = require("../models/topic.model");

exports.createTopic = async (req, res) => {
  // ADMIN API KEY KONTROLÜ
  const ADMIN_API_KEY = req.headers["admin-api-key"];
  if (ADMIN_API_KEY !== process.env.ADMIN_API_KEY) {
    return res.status(401).json({ error: "Unauthorized for create topic" });
  }

  try {
    if (Array.isArray(req.body)) {
      const validTopics = req.body.every((sub) => sub.name && sub.subject);

      if (!validTopics) {
        return res.status(400).json({ error: "Geçersiz veri formatı" });
      }
      // toplu ekleme
      const result = await Topic.insertMany(req.body);
      return res.json({
        status: "success",
        insertedCount: result.length,
      });
    }

    const topic = new Topic({
      name: req.body.name,
      subject: req.body.subject,
    });
    await topic.save();
    res.json({
      status: "success",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getTopics = async (req, res) => {
  try {
    const topics = await Topic.find();
    res.json({
      status: "success",
      data: {
        topics,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getTopic = async (req, res) => {
  try {
    // filter by subject
    const topic = await Topic.find({ subject: req.params.subject });
    res.json({
      status: "success",
      data: {
        topic,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
