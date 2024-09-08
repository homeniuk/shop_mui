import React, { useEffect } from 'react'
import styles from './good.module.css';
import { useAppDispatch, useAppSelector } from '../../hooks/hook';
import { TypePropsGoodElement } from '../../types/typesGoods';
import { Link } from 'react-router-dom';
import BuyIcon from './BuyIcon';
import { Rating } from '@mui/material';


const GoodElement: React.FC<TypePropsGoodElement> = (props) => {
    const { id, name, image, price, rating, inBasket, isAdding, token } = props;
    const dispatch = useAppDispatch();

    const _link = '' + id;

    return (
        <div className={styles.item}>
            <div className={styles.divPicture}>
                <Link to={_link}>
                    <img src={image} alt='' className={styles.Picture} />
                </Link>
            </div>
            <div className={styles.divname}>
                <Link to={_link}> {name} </Link>
            </div>
            <Rating defaultValue={rating} precision={0.5} readOnly />
            <div className={styles.buy}>
                <div className={styles.price}>Price: {price} UAH</div>
                <BuyIcon id={id} token={token} isAdding={isAdding} inBasket={inBasket}/>
            </div>
        </div>
    )
}

export default GoodElement;


