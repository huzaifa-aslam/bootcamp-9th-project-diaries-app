import React, { FC, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, TextareaAutosize, Button } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { RootState } from '../../rootReducer'
import { useAppDispatch } from '../../store';
import { showAlert } from '../../util';
import Markdown from 'markdown-to-jsx';
import http from '../../services/api';
import { Entry } from './../../interfaces/entry.interfaces';
import { Diary } from './../../interfaces/diary.interfaces';
import { setCurrentlyEditing, setCanEdit } from './editorSlice';
import { updateDiary } from '../diary/diariesSlice';
import { updateEntry } from './entriesSlice';



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

    const { currentlyEditing: entry, canEdit, activeDiaryId } = useSelector(
        (state: RootState) => state.editor
    );
    const [editedEntry, updateEditedEntry] = useState(entry);
    const dispatch = useAppDispatch();


    const saveEntry = async () => {
        if (activeDiaryId == null) {
            return showAlert('Please select a diary.', 'warning');
        }
        if (entry == null) {
            http
                .post<Entry, { diary: Diary; entry: Entry }>(
                    `/diaries/entry/${activeDiaryId}`,
                    editedEntry
                )
                .then((data) => {
                    if (data != null) {
                        const { diary, entry: _entry } = data;
                        dispatch(setCurrentlyEditing(_entry));
                        dispatch(updateDiary(diary));
                    }
                });
        }
        else {
            http
                .put<Entry, Entry>(`diaries/entry/${entry.id}`, editedEntry)
                .then((_entry) => {
                    if (_entry != null) {
                        dispatch(setCurrentlyEditing(_entry));
                        dispatch(updateEntry(_entry));
                    }
                });
        }
        dispatch(setCanEdit(false));
    };

    useEffect(() => {
        updateEditedEntry(entry);
    }, [entry]);




    return (

        <>

            <form className={classes.root} noValidate autoComplete="off">
                <TextField value={editedEntry?.title ?? ''}
                    disabled={!canEdit}
                    onChange={(e) => {
                        if (editedEntry) {
                            updateEditedEntry({
                                ...editedEntry,
                                title: e.target.value,
                            });
                        } else {
                            updateEditedEntry({
                                title: e.target.value,
                                content: '',
                            });
                        }
                    }} id="filled-basic" label="Title" variant="filled" /><Button style={{ display: 'none' }}>(Edit)</Button><br />
                <TextareaAutosize disabled={!canEdit}

            value={editedEntry?.content ?? ''} onChange={(e) => {
                    if (editedEntry) {
                        updateEditedEntry({
                            ...editedEntry,
                            content: e.target.value,
                        });
                    } else {
                        updateEditedEntry({
                            title: '',
                            content: e.target.value,
                        });
                    }
                }} aria-label="minimum height" style={{ width: "96%", height: "400px" }} rowsMin={5} placeholder="Create Your Diary" />
                <Button style={{

                    width: '97%',
                    height: '60px'
                }} onClick={saveEntry} variant="contained" color="primary" type="submit">
                    Save
                    </Button>

            </form>
        </>
    )

};

export default Editor;