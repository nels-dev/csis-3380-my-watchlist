
import Grid from '@mui/material/Grid'
import { Typography, CardActionArea, CardContent, CardMedia, Card } from "@mui/material"
//import { useState, useEffect } from 'react';
//import { fetchMoviesByGenre, fetchMoviesAll } from "../services/movie.service"
import logo from "../assets/logo.png"
import Rating from '@mui/material/Rating';
import { useNavigate } from 'react-router-dom';

const MovieList = ({list}) => {
    
    const imgURL = "https://image.tmdb.org/t/p/w200/";
    const navigate = useNavigate();
    const handleClick = (id) => {
        navigate(`/movies/${id}`);
    }


    return (<Grid container spacing={2}>


        {list?.map(each => (
            <Grid item md={4} key={each.id} onClick={()=>handleClick(each.id)}>
                <Card variant='outlined'>

                    <CardActionArea>
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
                                    <Typography component="div" variant="subtitle2" fontWeight={700} textTransform='uppercase' >
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
                                        <Rating name="half-rating-read" defaultValue={each.vote_average / 2} precision={0.5} style={{ margin: '0 4px' }} readOnly size='small' />
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