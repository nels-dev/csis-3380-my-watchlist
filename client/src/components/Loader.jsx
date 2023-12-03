import { CircularProgress, Stack } from "@mui/material";

const Loader = ({loading, children})=>{

    return loading ? (
    <Stack direction="row" justifyContent='center'>
            <CircularProgress sx={{m:5}}/>
    </Stack>)
     : children
}

export default Loader;