import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Card,Divider} from '@material-ui/core';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CreateIcon from '@material-ui/icons/Create';
import ArrowForwardOutlinedIcon from '@material-ui/icons/ArrowForwardOutlined';
import Swal from 'sweetalert2';
import { Route, Switch } from 'react-router-dom';
import { DiaryEntriesList } from './DiaryEntriesList'
import http from './../../services/api'
import { User } from './../../interfaces/user.interfaces'
import { Diary } from './../../interfaces/diary.interfaces'
import { useAppDispatch } from '../../store';
import { useSelector } from 'react-redux';
import { RootState } from '../../rootReducer';
import { addDiary } from './diariesSlice';
import { setUser } from '../auth/userSlice';
import { setCanEdit, setActiveDiaryId, setCurrentlyEditing } from '../entry/editorSlice';




const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    boxShadow: {
        boxShadow: '2px 2px 2px 2px #b39d9'
    }
});
const useStyles1 = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
    },
}));

const DiaryTile = () => {
    const classes1 = useStyles1();

    const classes = useStyles();
    const dispatch = useAppDispatch();
    const diaries = useSelector((state: RootState) => state.diaries);
    const user = useSelector((state: RootState) => state.user);

    const createDiary = async () => {
        const result = await Swal.mixin({
            input: 'text',
            confirmButtonText: 'Next →',
            showCancelButton: true,
            progressSteps: ['1', '2'],
        }).queue([
            {
                titleText: 'Diary title',
                input: 'text',
            },
            {
                titleText: 'Private or public diary?',
                input: 'radio',
                inputOptions: {
                    private: 'Private',
                    public: 'Public',
                },
                inputValue: 'private',
            },

        ]) as any
        const { value } = result;
        if (value) {
            const {
                diary,
                user: _user,
            } = await http.post<Partial<Diary>, { diary: Diary; user: User }>('/diaries/', {
                title: value[0],
                type: value[1],
                userId: user?.id,
            });
            if (diary && user) {
                dispatch(addDiary([diary] as Diary[]));
                dispatch(addDiary([diary] as Diary[]));
                dispatch(setUser(_user));
                return Swal.fire({
                    titleText: 'All done!',
                    confirmButtonText: 'OK!',
                });
            }
        }
        Swal.fire({
            titleText: 'Cancelled',
        });
    };

    return (
        <>

            <h1>Diary App</h1><hr />
            <Switch>
                <Route path="/diary/:id">
                    <DiaryEntriesList />
                </Route>
                <Route path="/">
                    <Button
                        onClick={createDiary}
                        variant="contained"
                        color="secondary"
                        className={classes1.button}
                        endIcon={<CreateIcon />}
                        style={{
                            margin: '8px',
                            width: '96%',
                            height: '55px',
                            borderRadius: '20px'
                        }}
                    >
                        Create New
                    </Button>
                    <div style={{overflowY:"scroll",height:"50vh"}}>
                    {diaries.map((diary, idx) => (
                        <Card key={idx}   className={classes.root} style={{ borderRadius: '16px', boxShadow:'2px #b39d9',marginBottom:"10px"}}>
                            <CardActionArea>

                                <CardContent style={{ textAlign: 'left' }}>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        {diary.title}
                                </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        {`${idx} saved entries`}
                                     </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions style={{ display: 'block' }}>
                                <Button style={{

                                    borderRadius: '20px'
                                }} size="small" variant="contained" color="primary" onClick={() => {
                                    dispatch(setCanEdit(true));
                                    dispatch(setActiveDiaryId(diary.id as string));
                                    dispatch(setCurrentlyEditing(null));
                                  }}>
                                    Add New Entry
                                 </Button>
                                <Button style={{

                                    borderRadius: '20px'
                                }} size="small" variant="contained" color="secondary" endIcon={<ArrowForwardOutlinedIcon />}>
                                    View All
                               </Button>
                            </CardActions>
                        </Card>

                    ))}
                    </div>
                </Route>
            </Switch>

        </>
    );

}
export default DiaryTile;
