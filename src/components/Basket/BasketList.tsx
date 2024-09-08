import React, { useEffect } from 'react'
import styles from './basket.module.css';
import { useAppDispatch, useAppSelector } from '../../hooks/hook';
import Loader from '../Loader';
import { getBasket } from '../../store/basketSlice';
import { useNavigate } from 'react-router-dom';
import BasketElement from './BasketElement';
import { Typography } from '@mui/material';


const BasketList: React.FC = () => {
    const navigate = useNavigate();
    const dispatch  = useAppDispatch();
    const list      = useAppSelector((state)=>state.basket.list);
    const token     = useAppSelector((state)=>state.user.token);
    const isLoading = useAppSelector((state)=>state.basket.isLoading);
    const AreAdding = useAppSelector((state)=>state.basket.listOfAdding);

    useEffect(() => {
        dispatch(getBasket({token}));
    }, [token]);

    if (token ===""){
        navigate("/");
    }

    if (isLoading)
        return <Loader />;

    let totalSum = 0;
    for(const good of list){
        totalSum = totalSum + good.quantity * good.product.price;    
    }

    return (
       <div>
            {list.map((i, index) => {
                const isAdding = AreAdding.includes(i.product.id);

                return <BasketElement key={index}
                id = {i.product.id}
                section = {i.product.catalog} 
                name = {i.product.name} 
                imageSmall = {i.product.imageSmall}
                price = {i.product.price}
                quantity = {i.quantity}
                token = {token}
                isAdding = {isAdding} />;
            })}
            <div className={styles.total}>
                <Typography variant='h4'> Total: {totalSum}</Typography>
            </div>
        </div>
    )
}

export default BasketList;