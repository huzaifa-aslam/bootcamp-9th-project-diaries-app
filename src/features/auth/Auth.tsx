import React, { FC, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button, Grid, Typography } from '@material-ui/core';
import * as Yup from 'yup';
import { User } from '../../interfaces/user.interfaces'
import { useForm } from 'react-hook-form';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import {useAppDispatch} from './../../store'
import './Auth.css'
import http from './../../services/api'
import {AuthResponse} from './../../services/mirage/routes/user'
import {saveToken, setAuthState } from './authSlice'
import {setUser} from './userSlice'

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '54ch;',
        },
    },
}));

const schema = Yup.object().shape({
    username: Yup.string()
        .required('What? No username?')
        .max(16, 'Username cannot be longer than 16 characters'),
    password: Yup.string().required('Without a password, "None shall pass!"'),
    email: Yup.string().email('Please provide a valid email address (abc@xy.z)'),
});

const Auth: FC = () => {
    const { handleSubmit, register, errors } = useForm<User>({

      });
    const classes = useStyles()
    const [isLogIn, setIsLogIn] = useState(true)
    const [loading, setLoading] = useState(false)
    const dispatch=useAppDispatch()
    const submitForm=(data:User)=>{
        const path=isLogIn?'/auth/login':'/auth/signup'
        http
            .post<User,AuthResponse>(path,data)
            .then((res)=>{
                if(res){
                    const {user,token}=res
                    dispatch(saveToken(token));
                    dispatch(setUser(user));
                    dispatch(setAuthState(true))
                }
            })
    }
    return (
        <Grid container style={{marginTop: "50px"}}>
            <Grid item sm={3}></Grid>
            <Grid item sm={6}>
                <Typography  variant="h3">LogIn</Typography> <LockOpenIcon className="logInIcon"></LockOpenIcon>
                <form onSubmit={handleSubmit(submitForm)} className={classes.root} noValidate autoComplete="off">
                    <TextField ref={register} variant="outlined" name="username" label="Name" /><br />

                    <TextField ref={register} variant="outlined" type="number" name="Password" label="Password" /><br />

                    {!isLogIn && (

                        <><TextField ref={register} variant="outlined" type="text" name="email" label="Email" /><br /></>
                    )}
                    <><Button style={{width: "73%"}} variant="contained" color="primary" type="submit">{isLogIn ? 'Login' : 'Create an Account'}</Button><br /></>
                    <div style={{margin:" 0 auto"}}>

                        <p style={{ cursor: 'pointer', opacity: 0.7 }} onClick={() => setIsLogIn(!isLogIn)}>
                            {isLogIn ? 'No account? Create one' : 'Already have an account?'}
                        </p>
                    </div>


                </form>
            </Grid>
            <Grid item sm={3}></Grid>
        </Grid>
    )
}
export default Auth