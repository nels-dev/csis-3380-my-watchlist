
import Grid from '@mui/material/Grid'
import { Chip, Typography, CardActionArea, CardContent, CardMedia, Card } from "@mui/material"
import { useState, useEffect } from 'react';
import { fetchDeptCrew } from "../services/crew.services"
import logo from "../assets/logo.png"
import Rating from '@mui/material/Rating';



const CrewList = (props) => {

    const [data, setData] = useState([]);
    const imgURL = "https://image.tmdb.org/t/p/w200/";



    useEffect(() => {

        // "Ryan Reynolds",
        // crew(10859).then(({ data }) => {
        //     console.log(data)
        //     setState(data)
        // });

        fetchDeptCrew(props.dept).then(({ data }) => {
            console.log(data)
            setData(data)
        });

    }, [])

    return (<Grid container spacing={2}>


        {data.map(each => (
            <Grid item md={4}>
                <Card variant='outlined'>

                    <CardActionArea key={each.id}>
                        <Grid container>
                            <Grid item xs={4}>
                                <CardMedia
                                    component="img"

                                    image={each.profile_path ? imgURL + each.profile_path : logo}
                                    alt={each.name}
                                />
                            </Grid>
                            <Grid item xs={8}>
                                <CardContent>
                                    <Typography component="div" variant="h5" fontWeight={700} textTransform='uppercase' >
                                        {each.name}
                                    </Typography>
                                    <Typography variant="subtitle1" color="text.secondary" component="div">
                                        {each.department}
                                    </Typography> <br />
                                    <Typography variant="body1" color="text.secondary">
                                        Job: {each.job}
                                    </Typography>
                                    <Typography variant="body1" color="text.secondary">
                                        Known For: {each.known_for_department}
                                    </Typography>
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