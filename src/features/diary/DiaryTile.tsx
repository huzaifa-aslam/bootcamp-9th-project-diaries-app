import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CreateIcon from '@material-ui/icons/Create';
import ArrowForwardOutlinedIcon from '@material-ui/icons/ArrowForwardOutlined';

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    boxShadow:{
        boxShadow:'2px 2px 2px 2px #b39d9'
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

    return (
        <>

            <h1>Diary App</h1><hr />
            <Button
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
            <Card className={classes.root} style={{borderRadius: '16px',boxShadow:'2px 2px 2px 2px #b39d9'}}>
                <CardActionArea>

                    <CardContent style={{ textAlign: 'left' }}>
                        <Typography gutterBottom variant="h5" component="h2">
                            Lizard
          </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                            across all continents except Antarctica
          </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions style={{display: 'block'}}>
                    <Button style={{

                        borderRadius: '20px'
                    }} size="small" variant="contained" color="primary">
                        Add New Entry
        </Button>
                    <Button style={{

                        borderRadius: '20px'
                    }} size="small" variant="contained" color="secondary" endIcon={<ArrowForwardOutlinedIcon />}>
                        View All
        </Button>
                </CardActions>
            </Card>
        </>
    );

}
export default DiaryTile;
