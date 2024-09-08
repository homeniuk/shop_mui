import React from 'react'
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import UserComponent from './UserComponents/UserComponent';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
    return (
        <Grid container spacing={0}>
            <Grid item xs={10}>
                <div className='siteName'>
                    <Typography variant='h3'><Link className='simpleLink' to="/">shop</Link></Typography>
                </div>
            </Grid>

            <Grid item xs={2}>
                <UserComponent />
            </Grid>
        </Grid>
    );
}

export default Header;