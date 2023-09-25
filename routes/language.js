const express = require("express");
const router = express.Router();
const languageQuery = require("../queries/language.js");

router.get("/", async (req, res) => {
  try {
    const languages = await languageQuery.getLanguages();
    res.status(200).send(languages);
  } catch (err) {
    console.log(err);
  }
});

router.get("/:langid", async (req, res) => {
  const id = parseInt(req.params.langid);
  try {
    const languages = await languageQuery.getLanguage(id);
    res.status(200).send(languages);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.post("/", (req, res) => {
  const newLang = req.body;
  try {
    languageQuery.createLanguage(newLang);
    res.status(200).send(newLang);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router