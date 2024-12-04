const getFilmsData = require("../utils/getFilmsData");
const saveFilmsData = require("../utils/saveFilmData");

const createFilm = (req, res) => {
  try {
    const films = getFilmsData();
    const { title, rating, year, budget, gross, poster, position } = req.body;

    if (
      !title ||
      !rating ||
      !year ||
      !budget ||
      !gross ||
      !poster ||
      position === undefined
    ) {
      return res
        .status(400)
        .json({ error: "All fields except id are required" });
    }

    const filmAtPosition = films.find((film) => film.position === position);

    if (filmAtPosition) {
      films.forEach((film) => {
        if (film.position >= position) {
          film.position += 1;
        }
      });
    }

    const newId = String(
      films.length > 0 ? Math.max(...films.map((film) => +film.id)) + 1 : 1
    );

    const newFilm = {
      id: newId,
      title,
      rating,
      year,
      budget,
      gross,
      poster,
      position,
    };

    films.push(newFilm);
    films.sort((a, b) => a.position - b.position);

    saveFilmsData(films);

    res.status(201).json(newFilm);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create the film" });
  }
};

module.exports = createFilm;
