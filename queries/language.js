const { response } = require("express");
const fs = require("fs/promises");
const path = require("path");
const languageFilePath = path.join(
  __dirname,
  "../db/",
  "programming_languages.json"
);

async function readLanguages() {
  const languages = JSON.parse(await fs.readFile(languageFilePath));
  return languages;
}

async function writeLanguages(lang) {
  const data = JSON.stringify(lang, null, 2)
  await fs.writeFile(languageFilePath, data);

}

async function getLanguages() {
  const languages = await readLanguages();
  const selectedData = languages.map(lang => {
    return {id: lang.langid, name: lang.name}
  })
  return selectedData;
}

async function getLanguage(langid) {
  const languages = await readLanguages();
  const response = languages.find(lang => lang.langid === parseInt(langid))
  if(response){
    return response;
  } else {
    throw Error("Language not found!");
  }
}

async function createLanguage(lang) {
  const languages = await readLanguages();
  if (!languages.find((l) => l.langid === lang.langid)){
    languages.push(lang);
    await writeLanguages(languages)
    return lang;
  } else {
    throw Error("Language already exists");
  }
}

module.exports = {
  getLanguages,
  getLanguage,
  createLanguage,
};
