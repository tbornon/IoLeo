import React from "react";
import { Link } from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';

const useStyles = makeStyles(theme => ({
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
        },
        appBar: {
            zIndex: theme.zIndex.drawer + 1,
        },
    })
);

export default function ButtonAppBar() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        Plateforme ArduinoMKR
                    </Typography>

                    <Button component={Link} to="/" color="inherit" className={classes.button}>
                        Accueil
                    </Button>
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