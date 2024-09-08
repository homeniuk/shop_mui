import React, { useEffect } from 'react'
import userCss from './user.module.css';
import { useAppSelector, useAppDispatch } from "../../hooks/hook";
import UserLoginPanel from './UserLoginPanel';
import UserIsLoginPanel from './UserIsLoginPanel';
import Loader from '../Loader';
import { clearBasket, getBasket } from '../../store/basketSlice';

const UserComponent:React.FC = () => {
    const dispatch        = useAppDispatch();
    const isAuth          = useAppSelector((state)=>state.user.isAuth);
    const token           = useAppSelector((state)=>state.user.token);
    const isUserLogining  = useAppSelector((state)=>state.user.isUserLogining); 

    useEffect(()=>{
      if (token ==='')
        dispatch(clearBasket());
      else
        dispatch(getBasket({token}));
    },[token]) 

    if (isUserLogining)
      return <Loader/>

    return (
        <div className={userCss.centerPosition}>
          {!isAuth && <UserLoginPanel /> }  
          {isAuth && <UserIsLoginPanel /> }
        </div>
      );
}

export default UserComponent;