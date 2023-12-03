import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchSingleCrew } from "../services/crew.services";
import { Divider, Typography } from "@mui/material";
import { Grid } from "@mui/material";
import { fetchMoviesByCrew } from "../services/movie.service";
import MovieList from "./MovieList";
const CrewDetail = () => {
    const imgURL = "https://image.tmdb.org/t/p/w200";
    const { id } = useParams();
    const [crew, setCrew] = useState({name:'', known_for_department:''})
    const [movies, setMovies] = useState([])
    useEffect(()=>{
        fetchSingleCrew(id)
        .then(({data})=>{
            setCrew(data)
            return fetchMoviesByCrew(id)
        })
        .then(({data})=>{
            setMovies(data)
        })
    }, [id])
    return (<Grid container spacing={5}>
        <Grid item xs={4} md={2}>
             {crew.profile_path && <img width='100%' src={imgURL + crew.profile_path}/>}
        </Grid>
        <Grid item xs>
            <Typography variant="h4" gutterBottom>{crew.name}</Typography>
            <Typography variant="subtitle2" gutterBottom>{crew.known_for_department} department</Typography>            
            <Divider sx={{mt: 5, mb:5}}/>
            <Typography variant="h5" gutterBottom>Participated in</Typography>
            <MovieList list={movies}/>
        </Grid>
       
    </Grid>)
}

export default CrewDetail