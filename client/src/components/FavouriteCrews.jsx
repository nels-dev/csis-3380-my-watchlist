import { useContext, useEffect, useState } from "react"
import Loader from "./Loader"
import CrewList from "./CrewList"
import { getCrewFav } from "../services/fav.services"
import { AuthContext } from "../context/auth.provider";

const FavouriteCrews = ()=>{
    const authContext = useContext(AuthContext);
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState([])
    useEffect(()=>{
        setLoading(true)
        getCrewFav(authContext.token)
        .then(({data})=> setData(data))
        .catch((error)=> console.log(error))
        .finally(()=> setLoading(false))
    },[authContext.token])
    return(
        <Loader loading={loading} >
            <CrewList data={data} />
        </Loader>
    )
}

export default FavouriteCrews