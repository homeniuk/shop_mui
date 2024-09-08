import React from 'react'
import { Link } from "react-router-dom";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

const Menu: React.FC = () => {

    return (
        <List component="nav" aria-label="mailbox folders">
            <Link className='simpleLink' to='/armchairs'>
                <ListItem button>
                    <ListItemText primary="Armchairs" />
                </ListItem>
            </Link>
            <Link className='simpleLink' to='/tables'>
                <ListItem button>
                    <ListItemText primary="Tables" />
                </ListItem>
            </Link>
        </List>
    )
}

export default Menu;