import React, { useEffect } from 'react'
import styles from './good.module.css';
import { useAppDispatch, useAppSelector } from '../../hooks/hook';
import { downloadSectionOfGoods, clearListOfGoods } from '../../store/goodSlice';
import { TypePropsGoodsList, TypeOfMassivToDisplay } from '../../types/typesGoods';
import GoodElement from './GoodElement';



const GoodsList: React.FC<TypePropsGoodsList> = (props) => {
    const { section }   = props;
    const dispatch      = useAppDispatch();
    const token         = useAppSelector((state)=>state.user.token);
    const goods         = useAppSelector((state)=>state.good.goodsList);
    const basket        = useAppSelector((state)=>state.basket.list);
    const AreAdding     = useAppSelector((state)=>state.basket.listOfAdding);

    let finalMassiv: TypeOfMassivToDisplay[] = [];
    for(const g of goods) {
        const line: TypeOfMassivToDisplay = {...g, isAdding: false, inBasket:false};
        
        const filterInBasket = basket.filter(i=>i.product.id === g.id);
        if (filterInBasket.length===1)
            line.inBasket = true;

        const isAdding = AreAdding.includes(g.id);
        if (isAdding) 
            line.isAdding = true;
            
        finalMassiv.push(line);    
    }

    useEffect(()=>{
        dispatch(downloadSectionOfGoods({section}));
        return () => {
            dispatch(clearListOfGoods());
        }
    },[section])

    return (
       <div className={styles.goodsListContainer}>
            {finalMassiv.map((i, index)=>{
                return <GoodElement key={i.id}
                id      = {i.id}
                name    = {i.name} 
                image   = {i.image}
                price   = {i.price}
                rating  = {i.rating}
                inBasket= {i.inBasket} 
                isAdding= {i.isAdding}
                section = {section}
                token   = {token}/>;
            })}
       </div>
    )
}

export default GoodsList;