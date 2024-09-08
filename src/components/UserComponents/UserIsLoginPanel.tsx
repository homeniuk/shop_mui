import React from 'react'
//import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/hook';
import { userLogout } from '../../store/userSlice';
import { Stack, Tooltip, IconButton } from '@mui/material';

const UserLoginPanel: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const logout = () => {
        dispatch(userLogout());
        //navigate("/", { replace: true });
    }
    const basket = () => {
        navigate("/basket", { replace: false });
    }

    return (
        <Stack direction="row" spacing={4}>
            <Tooltip title="Basket">
                <IconButton onClick={basket}>
                    <ShoppingCartIcon fontSize="large" />
                </IconButton>
            </Tooltip>
            <Tooltip title="Logout">
                <IconButton onClick={logout}>
                    <LogoutIcon fontSize="large" />
                </IconButton>
            </Tooltip>
        </Stack>
    );
}

export default UserLoginPanel;