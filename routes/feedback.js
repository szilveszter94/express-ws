const express = require("express");
const router = express.Router();
const feedbackQuery = require("../queries/feedback.js");

router.get("/", async (req, res) => {
  try {
    const feedbacks = await feedbackQuery.getFeedbacks();
    res.status(200).send(feedbacks);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get("/summary/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const summary = await feedbackQuery.getFeedbackSummary(id);
    res.status(200).send(summary);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.post("/vote/:langid", async (req, res) => {
  const newVote = req.body;
  const langId = parseInt(req.params.langid);
  try {
    await feedbackQuery.vote(langId, newVote.vote);
    res.status(200).send(newVote);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router
