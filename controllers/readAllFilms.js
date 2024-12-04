const fs = require("fs");

const getFilmsData = () => {
  const data = fs.readFileSync("top250.json", "utf8");
  return JSON.parse(data);
};

const readAllFilms = (req, res) => {
  try {
    const films = getFilmsData();
    const sortedFilms = films.sort((a, b) => a.position - b.position);
    res.json(sortedFilms);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to read films data" });
  }
};

module.exports = readAllFilms;
