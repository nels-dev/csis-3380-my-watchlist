
import Grid from '@mui/material/Grid'
import { Typography, CardActionArea, CardContent, CardMedia, Card, Stack } from "@mui/material"
import Rating from '@mui/material/Rating';
import { useNavigate } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';

const CrewList = (props) => {

    //const [data, setData] = useState([]);
    const imgURL = "https://image.tmdb.org/t/p/w200/";
    const navigate = useNavigate();
    const handleClick = (id) => {
        navigate(`/movies/crew/${id}`);
    }


    // useEffect(() => {

    //     // "Ryan Reynolds",
    //     // crew(10859).then(({ data }) => {
    //     //     console.log(data)
    //     //     setState(data)
    //     // });

    //     fetchDeptCrew(props.dept).then(({ data }) => {
    //         console.log(data)
    //         setData(data)
    //     });

    // }, [])

    return (<Grid container spacing={2} alignContent="stretch">


        {props.data.map(each => (
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
                                                <PersonIcon sx={{fontSize: 80}}/>
                                            </Stack>
                                        </Stack>
                                    </CardMedia>
                                )}
                                
                            </Grid>
                            <Grid item xs={8}>
                                <CardContent>
                                    <Typography component="div" variant="h6" fontWeight={700} textTransform='uppercase' >
                                        {each.name}
                                    </Typography>
                                    <Typography variant="subtitle1" color="text.secondary" component="div">
                                        {each.known_for_department}
                                    </Typography> <br />                                    
                                    <Typography variant="body1" color="text.secondary" style={{ display: 'flex', alignItems: 'center' }}>
                                        Popularity:
                                        <Rating name="half-rating-read" defaultValue={each.popularity / 30} precision={0.5} style={{ margin: '0 4px' }} readOnly />
                                        {/* {Math.floor(each.popularity)} / 150 */}
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