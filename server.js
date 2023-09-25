const express = require("express");
const feedbackQuery = require("./queries/feedback.js");

const app = express();
const PORT = 4000;

// TODO 3: middlewares
app.use(express.json());
app.use(logger);

function logger(req, res, next) {
  const ts = new Date();
  console.log(`[${ts}]: ${req.method} ${req.originalUrl}`);
  next();
}

// TODO 11: routes
// TODO 4: send response text
app.get("/", (req, res) => {
  res.send("Popular programming languages API 2.0");
});

const languageRouter = require("./routes/language.js");
app.use("/api/v2/languages", languageRouter);

const feedbackRouter = require("./routes/feedback.js");
app.use("/api/v2/feedbacks", feedbackRouter);

const main = () => {
  app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
  });
};

main();
