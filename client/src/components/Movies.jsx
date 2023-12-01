import React from 'react';
import Grid from '@mui/material/Grid'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import MovieList from './MovieList';
import { ListItem, ListItemButton, ListItemText } from '@mui/material';
import { fetchMoviesByGenre, fetchMoviesAll } from "../services/movie.service"
import Paginator from './Paginator';

const Movies = (props) => {

    const [genreList, setGenreList] = useState([]);
    const [movies, setMovies] = useState([]);
    const {genre} = useParams();
    const [totalPages, setTotalPages] = useState(0);
    const itemsLimit = 12;

    // get the list of genres for the menu
    useEffect(() => {
      axios.get('/api/movies/genres')
        .then(res => setGenreList(res.data))
        .catch(err => console.log(err))
    }, []);

    // get the movies, all or by genre
    useEffect(() => {
        if (!genre || genre === "All"){
            fetchMoviesAll().then(({ data }) => {
                console.log("No genre " + genre);
                setMovies(data);
                setTotalPages(Math.ceil(data.length / itemsLimit));
            })           
        } else {
        fetchMoviesByGenre(genre).then(({ data }) => {
            console.log("With genre " + genre);
            setMovies(data);
            setTotalPages(Math.ceil(data.length / itemsLimit));
        })};

    }, [])

    return (
        <Grid container spacing={3}>
        {/* Filter Bar on the left */}
        <Grid item md={2} >
        <strong>Genre: </strong>
        <ListItem key={"All"} disablePadding>
            <ListItemButton component="a" href={'/movies/All'}>
                <ListItemText primary={'All'} />
            </ListItemButton>
        </ListItem>

        {genreList.map((genre) => (
            <ListItem key={genre} disablePadding>
                <ListItemButton component="a" href={`/movies/${genre}`}>
                    <ListItemText primary={genre} />
                </ListItemButton>
            </ListItem>
        ))}

        </Grid>
        {/* Movies display */}
        <Grid item md={10}>
            {/* <MovieList list={movies}/> */}
            <Paginator targetComponent={MovieList} list={movies} totalPages={totalPages} itemsLimit={itemsLimit}/>
        </Grid>
    </Grid>
    );
};

export default Movies;