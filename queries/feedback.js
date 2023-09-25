const fs = require("fs/promises");
const path = require("path");
const feedbackFilePath = path.join(__dirname, "../db/", "feedback.json");

async function readFeedbacks() {
  return JSON.parse(await fs.readFile(feedbackFilePath));
}

async function writeFeedbacks(feedback) {
    const data = JSON.stringify(feedback, null, 2)
    await fs.writeFile(feedbackFilePath, data);
  }

async function getFeedbacks() {
  const feedbacks = readFeedbacks();
  if (feedbacks) {
    return feedbacks;
  } else {
    throw Error("Feedbacks not found!");
  }
}

async function getFeedbackSummary(langid) {
    const feedbacks = await readFeedbacks();
    if (feedbacks) {
        const filteredFeedbacks = feedbacks.filter(feed => feed.langid === langid);
        const upvotes = filteredFeedbacks.filter(feed => feed.vote > 0).length;
        const downvotes = filteredFeedbacks.filter(feed => feed.vote <= 0).length;
        return {langid, upvotes, downvotes}
    } else {
        throw Error("Feedbacks not found!");
    }
}

async function vote(langid, vote) {
    const feedbacks = await readFeedbacks();
    if (feedbacks){
        feedbacks.push({ langid, vote });
        await writeFeedbacks(feedbacks)
        return langid;
      } else {
        throw Error("Language already exists");
      }
}

module.exports = {
  getFeedbacks,
  getFeedbackSummary,
  vote,
};
