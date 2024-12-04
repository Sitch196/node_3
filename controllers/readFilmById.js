const fs = require("fs");

const getFilmsData = () => {
  const data = fs.readFileSync("top250.json", "utf8");
  return JSON.parse(data);
};

const readFilmById = (req, res) => {
  try {
    const films = getFilmsData();
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ error: "Film ID is required" });
    }

    const film = films.find((film) => film.id === id);

    if (!film) {
      return res.status(404).json({ error: "Film not found" });
    }

    res.json(film);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to read films data" });
  }
};

module.exports = readFilmById;
