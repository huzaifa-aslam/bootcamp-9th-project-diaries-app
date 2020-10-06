import React, { FC } from 'react'
import Editor from './../entry/Editor'

import DiaryTile from './../diary/DiaryTile'
import { Grid } from '@material-ui/core';

const Home: FC = () => {
    return (
        <Grid container style={{backgroundColor: '#80808029'}}>
            <Grid item sm={3}>

             <DiaryTile/>
            </Grid>
            <Grid style={{ textAlign: 'left' }} item sm={9}>

                <Editor/>
            </Grid>
        </Grid>
    )
}
export default Home
