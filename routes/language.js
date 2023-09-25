const express = require("express");
const router = express.Router();
const languageQuery = require("../queries/language.js");

router.get("/", async (req, res) => {
  try {
    const languages = await languageQuery.getLanguages();
    const { search, orderBy, dir } = req.query;
    let filteredLanguages = languages;
    if (search) {
      filteredLanguages = languages.filter((lan) =>
        lan.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (orderBy && dir) {
      const isNumericField = ["dob", "github23_pr", "github23_stars"].includes(
        orderBy
      );
      const sortOrder = dir.toLowerCase() === "asc" ? 1 : -1;
      filteredLanguages.sort((a, b) => {
        const valA = isNumericField ? a[orderBy] : a[orderBy].toLowerCase();
        const valB = isNumericField ? b[orderBy] : b[orderBy].toLowerCase();
        return (valA > valB ? 1 : valA < valB ? -1 : 0) * sortOrder;
      });
      res.status(200).send(filteredLanguages);
    }
  } catch (err) {
    res.status(500).send(err.message);
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

module.exports = router;
