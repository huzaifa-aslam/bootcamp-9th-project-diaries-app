import React, { useState } from 'react'
import { Button, List, ListItem, ListItemText, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import KeyboardBackspaceOutlinedIcon from '@material-ui/icons/KeyboardBackspaceOutlined';
import './DiariesEntries.css';
// import classnames from 'classnames'


const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
    },
}));

const useListStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
}));




export const DiaryEntriesList = () => {
    const [selectedIndex, setSelectedIndex] = useState<any>(1);
    const classes = useStyles();
    const listClasses = useListStyles();
    const handleListItemClick = (event: any, index: any) => {
        setSelectedIndex(index);
    };
    return (
        <>
            <Button
                variant="contained"
                color="secondary"
                className={classes.button}

                startIcon={<KeyboardBackspaceOutlinedIcon />}
                style={{
                    margin: '8px',
                    width: '96%',
                    height: '55px',
                    borderRadius: '20px'
                }}
            >
                Go Back
</Button>
            <List component="nav" aria-label="secondary mailbox folders" className={listClasses.root}>
                <ListItem button
                    selected={selectedIndex === 1}
                    onClick={(event) => handleListItemClick(event, 1)}>
                    <ListItemText primary="Trash" />
                </ListItem>
                <Divider />
                <ListItem button
                    selected={selectedIndex === 2}
                    onClick={(event) => handleListItemClick(event, 2)}>
                    <ListItemText primary="Spam" />
                </ListItem>

            </List>
        </>
    )
}
