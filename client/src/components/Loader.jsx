import { CircularProgress } from "@mui/material";

const Loader = ({loading, children})=>{

    return loading ? <CircularProgress /> : children
}

export default Loader;