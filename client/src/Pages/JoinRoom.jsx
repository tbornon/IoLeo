import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import { Success } from "../Components/Buttons"

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(3, 2),
        marginTop: "15px"
    }
}));

export default function JoinRoom() {
    const classes = useStyles();
    const [values, setValues] = React.useState({
        roomID: ""
    });

    const handleChange = name => e => {
        setValues({ [name]: e.target.value });
    };

    return (
        <Grid container justify="center">
            <Grid item xs={12} md={10} lg={8}>
                <Paper className={classes.root}>
                    <Grid container spacing={4}>
                        <Grid item xs={12}>
                            <Typography variant="h5" component="h3">
                                Rejoindre une salle
                        </Typography>
                        </Grid>
                        <Grid item xs={12} md={6} lg={3}>
                            <TextField
                                id="outlined-name"
                                label="Identifiant de la salle"
                                className={classes.textField}
                                value={values.roomID}
                                onChange={handleChange('roomID')}
                                margin="normal"
                                variant="outlined"
                                fullWidth
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Success variant="contained" color="primary" className={classes.margin}>
                                Rejoindre la salle
                            </Success>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    );
}