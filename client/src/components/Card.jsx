
import Grid from '@mui/material/Grid'
import { Chip, Typography, CardActionArea, CardContent, CardMedia } from "@mui/material"
import { useState, useEffect } from 'react';
import { crew } from "../services/crew.services"
import logo from "../assets/logo.png"
import Rating from '@mui/material/Rating';



const Card = () => {

    const [state, setState] = useState([]);
    const imgURL = "https://image.tmdb.org/t/p/w200/";

    useEffect(() => {

        crew(10).then(({ data }) => {
            console.log(data)
            setState(data)
        });
    }, [])

    return (<div>
        {state.map(each => (
            <CardActionArea key={each.id}>
                <Grid
                    alignItems='center'
                    container
                    direction="row"
                    padding={1}>
                    <Grid item>
                        <CardMedia
                            component="img"
                            sx={{ width: 130 }}
                            image={each.profile_path ? imgURL + each.profile_path : logo}
                            alt={each.name}
                        /></Grid>
                    <Grid item>
                        <CardContent>
                            <Typography component="div" variant="h5" fontWeight={700} textTransform='uppercase'>
                                {each.name}
                            </Typography>
                            <Typography variant="subtitle2" color="text.secondary" component="div">
                                {each.department}
                            </Typography> <br />
                            <Typography variant="body1" color="text.secondary">
                                Job: {each.job}
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                                Known For: {each.known_for_department}
                            </Typography>
                            <Typography variant="body1" color="text.secondary" style={{ display: 'flex', alignItems: 'center' }}>
                                Popularity: <Rating name="half-rating-read" defaultValue={each.popularity / 20} precision={0.5} style={{ margin: '0 4px' }} readOnly /> {Math.floor(each.popularity)} / 100
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                                Movies: {each.movies.map(movie => (
                                    <Chip label={movie} style={{ margin: '0 4px' }} key={movie} onClick={null} />
                                ))}
                            </Typography>
                        </CardContent>

                    </Grid>
                </Grid>
            </CardActionArea>
        ))}

    </div>)
};

export default Card;