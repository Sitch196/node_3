const express = require("express");
const readAllFilms = require("./controllers/readAllFilms");
const readFilmById = require("./controllers/readFilmById");

const app = express();
app.use(express.json());

app.get("/api/films/readall", readAllFilms);
app.get("/api/films/read", readFilmById);

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
