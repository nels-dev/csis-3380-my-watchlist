import { ListItem, ListItemButton, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';

const Filter = (props) => {
    return (


        <ListItem disablePadding>
            <ListItemButton component={Link} to={`/${props.dept}`}>
                <ListItemText primary={props.name} />
            </ListItemButton>
        </ListItem>

    );
}

export default Filter;