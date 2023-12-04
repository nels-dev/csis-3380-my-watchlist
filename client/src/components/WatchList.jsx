import { useContext, useEffect, useState } from "react"
import Loader from "./Loader"
import { getMovieFav } from "../services/fav.services"
import { AuthContext } from "../context/auth.provider";
import MovieList from "./MovieList";

const WatchList = ()=>{
    const authContext = useContext(AuthContext);
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState([])
    useEffect(()=>{
        setLoading(true)
        getMovieFav(authContext.token)
        .then(({data})=> setData(data))
        .catch((error)=> console.log(error))
        .finally(()=> setLoading(false))
    },[authContext.token])
    return(
        <Loader loading={loading} >
            <MovieList list={data} />
        </Loader>
    )
}

export default WatchList