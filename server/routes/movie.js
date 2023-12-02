import express from "express";
import Movie from "../models/movie.js"
const router = express.Router();


// get all movies
router.route("/all").get((req, res) => {
    Movie.find({})
    .sort({vote_average: -1, release_date: -1})
    .then((movies) => res.json(movies))
    .catch((err) => res.status(400).json("Error: " + err));
});

// get unique list of genres in ascending order
router.route("/genres").get((req, res) => {
    Movie.distinct("genres.name")
      .sort()
      .then((genres) => res.json(genres))
      .catch((err) => res.status(400).json("Error: " + err));
  });

// get movie by genre
router.route("/:genre").get((req, res) => {
    Movie.find({"genres.name": req.params.genre})
    .sort({vote_average: -1, release_date: -1})
    .then((movies) => res.json(movies))
    .catch((err) => res.status(400).json("Error: " + err));
});

// get movie by crew id
router.route("/crew/:id").get((req, res) => {
    Movie.find({"credits.crew.id": Number(req.params.id)})
    .sort({vote_average: -1, release_date: -1})
    .then((movies) => res.json(movies))
    .catch((err) => res.status(400).json("Error: " + err));
});


export default router;
