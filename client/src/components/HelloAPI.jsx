import { useEffect, useState } from "react";
import axios from "axios";

const HelloApi = () => {
    const [apiResponse, setApiResponse] = useState("")
    useEffect(()=>{
        axios.get("http://localhost:5001/").then(({data})=>{
            setApiResponse(data);
        })
    })
    return ( <>
        {apiResponse}
    </> );
}
 
export default HelloApi;