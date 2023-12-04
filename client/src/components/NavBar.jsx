import { Button, Grid} from "@mui/material";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/auth.provider";
import { useContext } from "react";
const NavBar = () => {
    const authContext = useContext(AuthContext);
    return (<Grid container sx={{mt:1, mb:3}} spacing={3}>
        <Grid item>
            <Button size='large' component={NavLink} to="/crews">Crew</Button>
        </Grid>
        <Grid item>
            <Button size='large' component={NavLink} to="/movies">Movies</Button>
        </Grid>
        {authContext.authenticated && (
            <>
            <Grid item>
                <Button size='large' component={NavLink} to="/favourite">My Favourite</Button>
            </Grid>
            <Grid item>
                <Button size='large' component={NavLink} to="/watch-list">Watch List</Button>
            </Grid>
            </>
        )}
        
    </Grid>);
};

export default NavBar;