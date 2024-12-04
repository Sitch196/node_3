const express = require("express");
const fs = require("fs");

const app = express();

const getFilmsData = () => {
  const data = fs.readFileSync("top250.json", "utf8");
  return JSON.parse(data);
};

app.get("/api/films/readall", (req, res) => {
  try {
    const films = getFilmsData();
    const sortedFilms = films.sort((a, b) => a.position - b.position);
    res.json(sortedFilms);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to read films data" });
  }
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
