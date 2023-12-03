
import Grid from '@mui/material/Grid'
import { Typography, CardActionArea, CardContent, CardMedia, Card, Stack, useTheme } from "@mui/material"
import Rating from '@mui/material/Rating';
import { useNavigate } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';

const CrewList = ({data, disableLink=false}) => {

    const imgURL = "https://image.tmdb.org/t/p/w200/";
    const navigate = useNavigate();
    const handleClick = (id) => {
        if(!disableLink) navigate(`/crews/${id}`);
    }
    const theme = useTheme();

    return (<Grid container spacing={2} alignContent="stretch">


        {data && data.map(each => (
            <Grid item md={4} key={each.id} onClick={() => handleClick(each.id)}> 
                <Card variant='outlined' sx={{height: '100%'}}>

                    <CardActionArea sx={{height: '100%'}}>
                        <Grid container sx={{height: '100%'}} alignContent="stretch">
                            <Grid item xs={4}>
                                {each.profile_path && (
                                    <CardMedia
                                    component="img"
                                    image={imgURL + each.profile_path}
                                    alt={each.name}
                                />
                                )}
                                {!each.profile_path && (
                                    <CardMedia sx={{height: '100%'}}>
                                        <Stack sx={{height: '100%'}} direction='column' justifyContent='center'>
                                            <Stack direction='row' justifyContent='center'>
                                                <PersonIcon sx={{fontSize: 80, color: theme.palette.grey[400]}}/>
                                            </Stack>
                                        </Stack>
                                    </CardMedia>
                                )}
                                
                            </Grid>
                            <Grid item xs={8}>
                                <CardContent>
                                    <Typography component="div" variant="subtitle1" fontWeight={700} textTransform='uppercase' >
                                        {each.name}
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary" component="div">
                                        {each.known_for_department}
                                    </Typography> <br />                                    
                                    <Typography variant="body1" color="text.secondary" style={{ display: 'flex', alignItems: 'center' }}>
                                        Popularity:
                                        <Rating name="half-rating-read" defaultValue={Math.log(each.popularity)} precision={0.5} style={{ margin: '0 4px' }} readOnly size='small'/>                                        
                                    </Typography>

                                </CardContent>

                            </Grid>
                        </Grid>
                    </CardActionArea>
                </Card>
            </Grid>
        ))}
    </Grid>
    )
};

export default CrewList;