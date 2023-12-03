import React from "react";
import Grid from "@mui/material/Grid";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import MovieList from "./MovieList";
import { ListItem, ListItemButton, ListItemText } from "@mui/material";
import { fetchMoviesByGenre, fetchMoviesAll, fetchMoviesByCrew } from "../services/movie.service";
import Paginator from "./Paginator";
import Loader from "./Loader";

const Movies = () => {
  const [loading, setLoading] = useState(false)
  const [genreList, setGenreList] = useState([]);
  const [movies, setMovies] = useState([]);
  const { genre, id } = useParams();
  const [totalPages, setTotalPages] = useState(0);
  const itemsLimit = 12;

  // get the list of genres for the menu
  useEffect(() => {
    axios
      .get("/api/movies/genres")
      .then((res) => setGenreList(res.data))
      .catch((err) => console.log(err));
  }, []);

  // get the movies, all or by genre
  useEffect(() => {
    setLoading(true)
    if (id) {
        fetchMoviesByCrew(id).then(({ data }) => {
            console.log("Crew id: " + id);
            setMovies(data);
            setTotalPages(Math.ceil(data.length / itemsLimit));
          })
          .finally(()=>setLoading(false));
    } else if (!genre || genre === "All") {
      fetchMoviesAll().then(({ data }) => {
        console.log("No genre " + genre);
        console.log(data)
        setMovies(data);
        setTotalPages(Math.ceil(data.length / itemsLimit));
      })
      .finally(()=>setLoading(false));
    } else {
      fetchMoviesByGenre(genre).then(({ data }) => {
        console.log("With genre " + genre);
        setMovies(data);
        setTotalPages(Math.ceil(data.length / itemsLimit));
      })
      .finally(()=>setLoading(false));
    }
  }, [genre, id]);

  return (
    
    <Grid container spacing={3}>
      {/* Filter Bar on the left */}
      <Grid item md={2}>
        <strong>Genre </strong>
        <ListItem key={"All"} disablePadding>
          <ListItemButton component={Link} to={"/movies/genre/All"}>
            <ListItemText primary={"All"} />
          </ListItemButton>
        </ListItem>

        {genreList.map((genre) => (
          <ListItem key={genre} disablePadding>
            <ListItemButton component={Link} to={`/movies/genre/${genre}`}>
              <ListItemText primary={genre} />
            </ListItemButton>
          </ListItem>
        ))}
      </Grid>
      {/* Movies display */}
      <Grid item md={10}>
        <Loader loading={loading}>
          <Paginator
            targetComponent={MovieList}
            list={movies}
            totalPages={totalPages}
            itemsLimit={itemsLimit}
          />
        </Loader>
      </Grid>
    </Grid>
    
  );
};

export default Movies;
