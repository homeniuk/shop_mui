import React from 'react'
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import { useNavigate } from 'react-router-dom';

const UserLoginPanel: React.FC = () => {
    const navigate = useNavigate();
    const openLoginForm = () => {
        navigate("/login", { replace: false });
    }

    return (
        <Tooltip title="Login">
            <IconButton onClick={openLoginForm}>
                <PermIdentityIcon fontSize="large" />
            </IconButton>
        </Tooltip >
    );
}

export default UserLoginPanel;