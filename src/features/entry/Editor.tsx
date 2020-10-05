import React, { FC, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, TextareaAutosize, Grid, Button } from '@material-ui/core';
import DiaryTile from './../diary/DiaryTile'
import {DiaryEntriesList} from './../diary/DiaryEntriesList'



const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '104ch',
            border: ' 2px solid',
            borderRadius: ' 10px',
        },

    },
}));

const useStyles1 = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
    },
}));


const Editor: FC = () => {
    const classes = useStyles();

    const classes1 = useStyles1();

    return (
        <Grid container style={{backgroundColor: '#80808029'}}>
            <Grid item sm={3} >
                <DiaryEntriesList/>
            </Grid>
            <Grid style={{ textAlign: 'left' }} item sm={9}>

                <form className={classes.root} noValidate autoComplete="off">
                    <TextField id="filled-basic" label="Title" variant="filled" /><Button style={{ display: 'none' }}>(Edit)</Button><br />
                    <TextareaAutosize aria-label="minimum height" style={{ width: "96%", height: "400px" }} rowsMin={5} placeholder="Create Your Diary" />
                    <Button style={{
                        width: '97%',
                        height: '60px'
                    }} variant="contained" color="primary">
                        Save
                    </Button>

                </form>
            </Grid>
        </Grid>
    )

};

export default Editor;