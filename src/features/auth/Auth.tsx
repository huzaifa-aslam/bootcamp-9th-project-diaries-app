import React, { FC, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button, Grid, Typography } from '@material-ui/core';
import * as Yup from 'yup';
import { User } from '../../interfaces/user.interfaces'
import { useForm } from 'react-hook-form';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import './Auth.css'

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
    const { handleSubmit, errors, register } = useForm()
    const classes = useStyles()
    const [isLogIn, setIsLogIn] = useState(true)
    return (
        <Grid container style={{marginTop: "50px"}}>
            <Grid item sm={3}></Grid>
            <Grid item sm={6}>
                <Typography><h2>LogIn</h2></Typography> <LockOpenIcon className="logInIcon"></LockOpenIcon>
                <form className={classes.root} noValidate autoComplete="off">
                    <TextField variant="outlined" name="username" label="Name" /><br />

                    <TextField variant="outlined" type="number" name="Password" label="Password" /><br />

                    {!isLogIn && (

                        <><TextField variant="outlined" type="text" name="email" label="Email" /><br /></>
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