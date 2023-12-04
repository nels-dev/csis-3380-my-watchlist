import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { fetchSingleCrew } from "../services/crew.services";
import { Box, Button, Stack, Typography } from "@mui/material";
import { Grid } from "@mui/material";
import { fetchMoviesByCrew } from "../services/movie.service";
import MovieList from "./MovieList";
import { AuthContext } from "../context/auth.provider"
import { addCrewFav, checkCrewFavStatus, deleteCrewFav } from "../services/fav.services";
const CrewDetail = () => {
    const authContext = useContext(AuthContext);
    const imgURL = "https://image.tmdb.org/t/p/w200";
    const { id } = useParams();
    const [crew, setCrew] = useState({name:'', known_for_department:''})
    const [movies, setMovies] = useState([])
    const [added, setAdded] = useState(false)
    
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
    const addToFavourite = (id)=>{
        addCrewFav(id, authContext.token)
        .then(setAdded(true))
    }
    useEffect(()=>{
        if(authContext.token){
            checkCrewFavStatus(id, authContext.token)
            .then(()=> setAdded(true))
            .catch(()=> setAdded(false))
        }
    }, [id, authContext.token])
    const removeFromFavourite = (id)=>{
        deleteCrewFav(id, authContext.token)
        .then(setAdded(false))
    }
    return (<Grid container spacing={5}>
        <Grid item xs={4} md={2}>
             {crew.profile_path && <img width='100%' src={imgURL + crew.profile_path}/>}
        </Grid>
        <Grid item xs>
            <Stack direction='column' spacing={3}>
                <Typography variant="h4" >{crew.name}</Typography>
                <Typography variant="subtitle2" >{crew.known_for_department} department</Typography>       
                {authContext.authenticated && !added && (
                    <Box><Button variant='contained' onClick={()=>{addToFavourite(crew.id)}}>Add to favourite</Button></Box>
                )}                   
                {authContext.authenticated && added && (
                    <Box><Button variant='outlined' onClick={()=>{removeFromFavourite(crew.id)}}>Remove from favourite</Button></Box>
                )}                   
                <Typography variant="h5" gutterBottom>Participated in</Typography>
                <MovieList list={movies}/>
            </Stack>
        </Grid>
       
    </Grid>)
}

export default CrewDetail