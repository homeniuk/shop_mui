import React, { useState } from 'react'
import styles from './basket.module.css';
import { useAppDispatch, useAppSelector } from '../../hooks/hook';
import { TypePropsBasketElement } from '../../types/typesBasket';
import { Link } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import { Tooltip, IconButton, TextField } from '@mui/material';
import { changeQuantity, dropFromBasket } from '../../store/basketSlice';
import AddIcon from '@mui/icons-material/Add';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';


const BasketElement: React.FC<TypePropsBasketElement> = (props) => {
    const { id, name, imageSmall, price, quantity, section, token , isAdding} = props;
    const dispatch = useAppDispatch();

    const _link = '/' + section + '/' + id;
    let sum = price * quantity;

    const deletePosition = () => {
        dispatch(dropFromBasket({ token, id }));
    }
    const inc = () => {
        dispatch(changeQuantity({ token, id, quantity:quantity + 1 }));
    }
    const dec = () => {
        const q = quantity - 1;
        if (q <= 0)
            return;
        dispatch(changeQuantity({ token, id, quantity: q }));
    }

    return (
        <div>
            <div className={styles.elementContainer} >
                <div className={styles.divPicture}>
                    <Link to={_link}>
                        <img src={imageSmall} alt='' />
                    </Link>
                </div>
                <div>
                    <div className={styles.divname}>
                        <Link to={_link}>
                            {name}
                        </Link>
                    </div>
                    <div>Price: {price} UAH</div>
                    <div>Quantity: {quantity} </div>
                    <div>Sum: {sum} UAH</div>
                </div>

                <div>

                <Tooltip title="Deс">
                        <IconButton onClick={dec} disabled = {isAdding || quantity===1}>
                            <HorizontalRuleIcon fontSize="large" />
                        </IconButton>
                    </Tooltip>
                    {quantity}
                    <Tooltip title="Add">
                        <IconButton onClick={inc} disabled = {isAdding}>
                            <AddIcon fontSize="large" />
                        </IconButton>
                    </Tooltip>

                </div>

                <div>
                    <Tooltip title="delete position">
                        <IconButton onClick={deletePosition} disabled = {isAdding}>
                            <DeleteIcon fontSize="large" />
                        </IconButton>
                    </Tooltip>
                </div>
            </div>
        </div>
    )
}

export default BasketElement;
