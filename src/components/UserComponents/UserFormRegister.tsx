import React, { useEffect } from 'react';
import userCss from './user.module.css';
import { useForm, SubmitHandler } from "react-hook-form";
import {TextField, Button, Stack} from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { cleanError, registerOnServer } from '../../store/userSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/hook';
import { TypeRegisterForm } from '../../types/typesUser';
import Loader from '../Loader';
import { Navigate, useNavigate } from 'react-router-dom';

const schema = yup.object().shape({
  login: yup.string().required().min(5).max(100),
  email: yup.string().required().email(),
  password: yup.string().required().min(5).max(100),
  passwordConfirmation: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),
});

const UserFormRegister: React.FC = () => {
  const navigate        = useNavigate();
  const dispatch        = useAppDispatch();
  const loginError      = useAppSelector(state=>state.user.errorOnLogin);
  const isUserLogining  = useAppSelector(state=>state.user.isUserLogining);
  const isAuth          = useAppSelector(state=>state.user.isAuth)

  useEffect(()=>{
    dispatch(cleanError());
  }, [])

  const { register, handleSubmit, resetField, formState: { errors, isValid } } = useForm<TypeRegisterForm>({ 
    mode: "onChange", 
    resolver: yupResolver(schema), 
  });

  const onSubmit: SubmitHandler<TypeRegisterForm> = data=> {
    dispatch(registerOnServer(data));
    resetField('password');
    resetField('passwordConfirmation');
  }

  const goLoginForm = ()=>{
    navigate("/login", {replace: false});
  }
  
  if (isAuth)
    return <Navigate to="/" replace={true} />

  if (isUserLogining)
    return <Loader/>

  return (
    <div className={userCss.loginContainer}>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Stack spacing={2}>
          <TextField id="login" label="login" variant="outlined" size="small"
          helperText={errors.login?.message}
          error={!!errors.login?.message}
          {...register("login")} 
          />
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
          <TextField type="password" id="passwordConfirmation" label="confirm password" variant="outlined" size="small"
          helperText={errors.passwordConfirmation?.message}
          error={!!errors.passwordConfirmation?.message} 
          {...register("passwordConfirmation")} 
          />
          <Stack spacing={28} direction="row">
            <Button variant="outlined" type="submit" disabled = {!isValid}>Register</Button>
            <Button variant="outlined" type="button" onClick={goLoginForm} endIcon={<ArrowForwardIosIcon />}>Login</Button>
            
          </Stack>
        </Stack>
      </form>
      <div className={userCss.redText}>{loginError}</div>
    </div>
  );
}

export default UserFormRegister;