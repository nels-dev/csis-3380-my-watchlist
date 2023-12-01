
import Grid from '@mui/material/Grid'
import { Typography, CardActionArea, CardContent, CardMedia, Card } from "@mui/material"
//import { useState, useEffect } from 'react';
//import { fetchMoviesByGenre, fetchMoviesAll } from "../services/movie.service"
import logo from "../assets/logo.png"
import Rating from '@mui/material/Rating';


const MovieList = (props) => {
    
    const imgURL = "https://image.tmdb.org/t/p/w200/";

    // const [movies, setMovies] = useState([]);

    // useEffect(() => {
    //     if (!props.id || props.id === "All"){
    //         fetchMoviesAll().then(({ data }) => {
    //             console.log("No ID" + props.id);
    //             setMovies(data);
    //         })           
    //     } else {
    //     fetchMoviesByGenre(props.id).then(({ data }) => {
    //         console.log("With ID" + props.id);
    //         setMovies(data);
    //     })};

    // }, [])

    return (<Grid container spacing={2}>


        {props.list.map(each => (
            <Grid item md={4}>
                <Card variant='outlined'>

                    <CardActionArea key={each.id}>
                        <Grid container>
                            <Grid item xs={4}>
                                <CardMedia
                                    component="img"

                                    image={each.poster_path ? imgURL + each.poster_path : logo}
                                    alt={each.title}
                                />
                            </Grid>
                            <Grid item xs={8}>
                                <CardContent>
                                    <Typography component="div" variant="subtitle1" fontWeight={700} textTransform='uppercase' >
                                        {each.title}
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary" component="div">
                                        {each.tagline}
                                    </Typography> <br />
                                    <Typography variant="body2" color="text.secondary">
                                        Genres: {each.genres.map(element => element.name).join(' ')}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Release Date: {each.release_date}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" style={{ display: 'flex', alignItems: 'center' }}>
                                        Vote Average:
                                        <Rating name="half-rating-read" defaultValue={each.vote_average / 2} precision={0.5} style={{ margin: '0 4px' }} readOnly />
                                        {/* {Math.floor(each.popularity)} / 150 */}
                                    </Typography>

                                </CardContent>

                            </Grid>
                        </Grid>
                    </CardActionArea>
                </Card>
            </Grid>
        ))}
    </Grid>
    )
};

export default MovieList;