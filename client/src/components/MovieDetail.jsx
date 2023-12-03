import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Chip, Divider, Stack, Typography } from "@mui/material";
import { Grid } from "@mui/material";
import { fetchSingleMovie } from "../services/movie.service";
import CrewList from "./CrewList";
const MovieDetail = () => {
    const imgURL = "https://image.tmdb.org/t/p/w200";
    const { id } = useParams();
    const [movie, setMovie] = useState({poster_path: undefined, credits:{cast:[], crew:[]}})
    useEffect(()=>{
        fetchSingleMovie(id)
        .then(({data})=>{
            setMovie(data)
        })
    }, [id])
    return (<Grid container spacing={5}>
        <Grid item xs={4} md={2}>
             {movie.poster_path && <img width='100%' src={imgURL + movie.poster_path}/>}
        </Grid>
        <Grid item xs>
            <Stack direction='column' spacing={3}>
                <Typography variant="h4" gutterBottom>{movie.title}</Typography>
                <Typography variant="subtitle2" gutterBottom>Released {movie.release_date}</Typography>            
                <Typography variant="subtitle2" gutterBottom>{movie.overview}</Typography>
                <Box> {movie.genres?.map(genre=><Chip label={genre.name} sx={{mr: 2}}></Chip>)}</Box>
                <Typography variant="h5" gutterBottom>Casts</Typography>
                <CrewList data={movie.credits?.cast} disableLink/>
            </Stack>
        </Grid>       
    </Grid>)
}

export default MovieDetail