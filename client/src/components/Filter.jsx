import { Box, List, ListItem, ListItemButton, ListItemText } from '@mui/material';

const Filter = (props) => {
    return (


        <ListItem disablePadding>
            <ListItemButton component="a" href={`/${props.dept}`}>
                <ListItemText primary={props.name} />
            </ListItemButton>
        </ListItem>

    );
}

export default Filter;