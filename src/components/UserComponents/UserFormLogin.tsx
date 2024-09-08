import React, { useEffect } from 'react';
import userCss from './user.module.css';
import { useForm, SubmitHandler } from "react-hook-form";
import {TextField, Button, Stack} from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { cleanError, loginOnServer } from '../../store/userSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/hook';
import { TypeLoginEnter } from '../../types/typesUser';
import Loader from '../Loader';
import { Navigate, useNavigate } from 'react-router-dom';

const schema = yup.object().shape({
  email: yup.string().required().email(),
  password: yup.string().required().min(5).max(100),
});

const UserFormLogin: React.FC = () => {
  const navigate        = useNavigate();
  const dispatch        = useAppDispatch();
  const loginError      = useAppSelector(state=>state.user.errorOnLogin);
  const isUserLogining  = useAppSelector(state=>state.user.isUserLogining);
  const isAuth          = useAppSelector(state=>state.user.isAuth)

  const { register, handleSubmit, resetField, formState: { errors, isValid } } = useForm<TypeLoginEnter>({ 
    mode: "onChange", 
    resolver: yupResolver(schema), 
  });

  const onSubmit: SubmitHandler<TypeLoginEnter> = data=> {
    dispatch(loginOnServer(data));
    resetField('password');
  }
  const goRegisterForm = ()=>{
    navigate("/register", {replace: false});
  }

  useEffect(()=>{
    dispatch(cleanError());
  }, [])

  if (isAuth)
    return <Navigate to="/" replace={true} />

  if (isUserLogining )
    return <Loader/>

  return (
    <div className={userCss.loginContainer}>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Stack spacing={2}>
          <TextField id="email" label="email" variant="outlined" size="small"
          helperText={errors.email?.message}
          error={!!errors.email?.message}
          {...register("email")} 
          />
          <TextField type="password" id="password" label="password" variant="outlined" size="small"
          helperText={errors.password?.message}
          error={!!errors.password?.message} 
          {...register("password")} 
          />
          <Stack spacing={28} direction="row">
            <Button variant="outlined" type="submit" disabled = {!isValid}>Login</Button>
            <Button variant="outlined" type="button" onClick={goRegisterForm} endIcon={<ArrowForwardIosIcon />}>Register</Button>
          </Stack>
        </Stack>
      </form>
      <div className={userCss.redText}>{loginError}</div>
    </div>
  );
}

export default UserFormLogin;