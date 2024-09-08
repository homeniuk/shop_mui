import React from 'react'
import { useAppDispatch} from '../../hooks/hook';
import { TypePropsBuyIcon } from '../../types/typesGoods';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CheckIcon from '@mui/icons-material/Check';
import { IconButton, Tooltip } from '@mui/material';
import { addToBasket, toogleAdding } from '../../store/basketSlice';

const BuyIcon: React.FC<TypePropsBuyIcon> = (props) => {
    const dispatch = useAppDispatch();
    const { id, token, inBasket, isAdding } = props;

    const _addToBasket = () => {
        if (!(token==='')) {
            dispatch(addToBasket({token, id}));
        }
    }

    if (isAdding)
        return (
            <IconButton disabled>
                <ShoppingCartIcon />
            </IconButton>)

    if (inBasket)
        return (
            <Tooltip title="already in basket">
                <IconButton color='success'>
                    <CheckIcon />
                </IconButton>
            </Tooltip>)

    return (
        <Tooltip title="Buy">
            <IconButton color='success' onClick={_addToBasket}>
                <ShoppingCartIcon />
            </IconButton>
        </Tooltip>)
}

export default BuyIcon
