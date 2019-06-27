import React from 'react';
import { Redirect } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import PersonAdd from '@material-ui/icons/PersonAdd';

import { Danger, Success } from "../Components/Buttons"
import { withSnackbar } from "../Components/SnackbarProvider"

import { api } from "../config";

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(3, 2),
        marginTop: "15px"
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    dense: {
        marginTop: theme.spacing(2),
    },
    menu: {
        width: 200,
    },
    leftIcon: {
        marginRight: theme.spacing(1),
    },
    margin: {
        margin: theme.spacing(1),
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(10),
    },
}));

function CreateRoom(props) {
    const classes = useStyles();
    const [values, setValues] = React.useState({
        students: [{ firstName: "", lastName: "" }]
    });

    const [redirection, setRedirection] = React.useState({
        redirect: false,
        roomID: 0
    });

    const handleChange = (name, i) => e => {
        let students = [...values.students];
        students[i][name] = e.target.value;
        setValues({ students: students });
    };

    const addStudent = () => {
        setValues({ students: [...values.students, { firstName: "", lastName: "" }] })
    }

    const deleteStudent = i => () => {
        if (values.students.length > 1) {
            let students = [...values.students];
            students.splice(i, 1);
            setValues({
                students: students
            })
        }
    }

    const createRoom = () => {
        let validEntries = true;

        for (let i = 0; i < values.students.length; i++) {
            if (values.students[i].firstName === "" || values.students[i].lastName === "") {
                validEntries = false;
                break;
            }
        }

        if (validEntries) {
            const data = { ...values };

            fetch(api.protocol + "://" + api.hostname + ":" + api.port + "/room", {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
                .then(res => {
                    if (!res.ok) throw res;
                    else return res.json();
                })
                .then(res => {
                    props.snackbar.showMessage("success", "Salle créée avec succès");
                    setRedirection({ redirect: true, roomID: res._id });
                })
                .catch(console.error)
        }
        else {
            props.snackbar.showMessage("error", "Tous les champs doivent être remplis");
        }
    }

    if (redirection.redirect)
        return <Redirect to={"/room/" + redirection.roomID} />;

    return (
        <main className={classes.content}>
            <Grid container justify="center">
                <Grid item xs={12} md={10} lg={8}>
                    <Paper className={classes.root}>
                        <Grid container spacing={4}>
                            <Grid item xs={12}>
                                <Typography variant="h5" component="h3">
                                    Création de la salle
                        </Typography>
                            </Grid>

                            <Grid item xs={12}>
                                {values.students.map((student, i) =>
                                    <Grid container spacing={8} alignItems="center" key={i}>
                                        <Grid item xs={12} md={4}>
                                            <TextField
                                                id="outlined-name"
                                                label="Nom"
                                                className={classes.textField}
                                                value={student.lastName}
                                                onChange={handleChange('lastName', i)}
                                                margin="normal"
                                                variant="outlined"
                                                fullWidth
                                            />
                                        </Grid>

                                        <Grid item xs={12} md={4}>
                                            <TextField
                                                id="outlined-name"
                                                label="Prénom"
                                                className={classes.textField}
                                                value={student.firstName}
                                                onChange={handleChange('firstName', i)}
                                                margin="normal"
                                                variant="outlined"
                                                fullWidth
                                            />
                                        </Grid>

                                        <Grid item xs={12} md={4}>
                                            <Danger variant="contained" color="primary" onClick={deleteStudent(i)}>
                                                Supprimer l'étudiant
                                            </Danger>
                                        </Grid>
                                    </Grid>
                                )}
                            </Grid>

                            <Grid item xs={12}>
                                <Success variant="contained" color="primary" className={classes.margin} onClick={createRoom}>
                                    Créer la salle
                                </Success>
                                <Button variant="contained" color="primary" className={classes.margin} onClick={addStudent}>
                                    <PersonAdd className={classes.leftIcon} />
                                    Ajouter un étudiant
                                </Button>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </main>
    );
}

export default withSnackbar(CreateRoom);