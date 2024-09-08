import React, { useEffect } from 'react'
import styles from './good.module.css';
import { useAppDispatch, useAppSelector } from '../../hooks/hook';
import { downloadGoodInfo } from '../../store/goodSlice';
import {useParams } from "react-router-dom";
import Loader from '../Loader';
import BuyIcon from './BuyIcon';
import { toNumber } from 'lodash';


const GoodSinglePage: React.FC = () => {
    const dispatch      = useAppDispatch();
    const {section, id} = useParams();
    const _id:number = Number((id === undefined) ? '0': id);
    
    const token         = useAppSelector((state)=>state.user.token);
    const GoodInfo      = useAppSelector((state)=>state.good.singleGood);
    const isLoading     = useAppSelector((state)=>state.good.isGoodsLoading);
    const basket        = useAppSelector((state)=>state.basket.list);
    const AreAdding     = useAppSelector((state)=>state.basket.listOfAdding);

    useEffect(() => {
        dispatch(downloadGoodInfo({id:_id}));
    }, [_id]);

    if (isLoading)
        return <Loader />;
    if (!isLoading && GoodInfo.length === 0)
        return <div>The good wasn't found</div>;
    
    let inBasket = false;
    const filterInBasket = basket.filter(i=>i.product.id === _id);
        if (filterInBasket.length===1)
            inBasket = true;
    
    const isAdding = AreAdding.includes(_id);

    return (
       <div className={styles.GoodPage} >
            <div className={styles.divPicture}>
                <img src={GoodInfo[0].image} alt='' className={styles.Picture}/>
            </div>
            <div>
                <h2>{GoodInfo[0].name}</h2>
                <div>{GoodInfo[0].description}</div>
                <h2>Цена: {GoodInfo[0].price}</h2>
                <BuyIcon id = {_id} token = {token} inBasket = {inBasket} isAdding = {isAdding}/>
            </div>
        </div>
    )
}

export default GoodSinglePage;