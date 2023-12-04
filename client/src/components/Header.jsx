import logo from "../assets/logo.png"
import hero from "../assets/hero.jpg"
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import { useState } from "react"
import Button from '@mui/material/Button'
import { Box, Tooltip, Typography, useMediaQuery, useTheme } from "@mui/material"
import { login } from "../services/user.service"
import { useContext } from "react"
import { AuthContext } from "../context/auth.provider"

const Header = () => {
    const theme = useTheme();
    const smUp = useMediaQuery(theme.breakpoints.up('md'))
    const authContext = useContext(AuthContext);
    const [loginForm, setLoginForm] = useState({ email: '', password: '' })
    const submit = () => {
        login(loginForm)
            .then(({ data }) => {
                authContext.login(data.token)
                console.log("Login success")
            })
            .catch((err) => {
                console.error(err)
            })
    }
    const logout = () => {
        authContext.login(null)
    }
    return (<header>
        <Grid
            container
            gap={2}
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
            wrap="nowrap"
            sx={{ pt: 3 }}
        >
            <Grid item md={3}>
                <img src={logo} alt="logo" width="100%" />
            </Grid>
            <Grid item md>

            </Grid>
            {authContext.authenticated || (
                <>
                    <Grid item >
                        <Tooltip title="Demo Account: test@test; Password: 123">
                        <TextField
                            size="small"
                            id="email"
                            label="Email"
                            value={loginForm.email}
                            onChange={(event) => setLoginForm({ ...loginForm, email: event.target.value })}
                        />
                        </Tooltip>
                    </Grid>
                    <Grid item >
                        <TextField
                            size="small"
                            id="password"
                            type="password"
                            label="Password"
                            value={loginForm.password}
                            onChange={(event) => setLoginForm({ ...loginForm, password: event.target.value })}
                        />
                    </Grid>
                    <Grid item >
                        <Button variant="outlined" color="primary" onClick={submit}>
                            Login
                        </Button>
                    </Grid>
                </>
            )}
            {authContext.authenticated && (
                <Grid item >
                    <Button variant="outlined" color="primary" onClick={logout}>
                        Logout
                    </Button>
                </Grid>
            )}

        </Grid>


        <Box sx={{ height: '40vh', width: '100%' }}>
            <Grid
                sx={{ height: '100%', backgroundImage: `url(${hero})`, backgroundSize: 'cover', backgroundPosition: '0% 70%', backgroundColor: 'rgba(0,0,0,.5)', backgroundBlendMode: 'darken' }}
                alignItems='center'
                container
                gap={2}
                direction="row"
            >
                <Grid item md></Grid>
                <Grid item >
                    <Box sx={{ p:15, border: smUp ? '10px solid white': '0' }}>
                        <Typography variant="h5" color='white' fontWeight={700} textTransform='uppercase'>
                            Meet our heros behind the scene
                        </Typography>
                    </Box>
                </Grid>
                <Grid item md></Grid>
            </Grid>

        </Box>
    </header>);
}

export default Header;