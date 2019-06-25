import React from "react";
import { Link } from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    }
}));

export default function ButtonAppBar() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        Plateforme ArduinoMKR
          </Typography>
                    <Button color="inherit" classes={classes.button}>Accueil</Button>

                    <Button component={Link} to="/create" color="inherit">
                        Créer une salle
                    </Button>

                    <Button component={Link} to="/join" color="inherit" >
                        Rejoindre une salle
                    </Button>
                </Toolbar>
            </AppBar>
        </div>
    );
}