import React, { useState, useEffect } from 'react';
import { Redirect, Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import PersonAdd from '@material-ui/icons/PersonAdd';

import { Danger, Success, Warning } from "../Components/Buttons"
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

function EditRoom(props) {
    const classes = useStyles();
    const [values, setValues] = useState({
        students: [{ firstName: "", lastName: "" }],
        _id: props.match.params.id,
        special: false,
    });

    const [redirection, setRedirection] = useState({ redirect: false, roomID: 0 })

    useEffect(() => {
        fetch(api.protocol + "://" + api.hostname + ":" + api.port + "/room/" + props.match.params.id, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                if (!res.ok) throw res;
                else return res.json();
            })
            .then(res => {
                setValues(res);
                setRedirection({redirect: false});
            })
            .catch(console.error)
    }, [props.match.params.id]);

    const handleChange = (name, i) => e => {
        let students = [...values.students];
        students[i][name] = e.target.value;
        setValues({ ...values, students });
    };

    const handleChangeTxt = name => e => {
        if (e.target.type === "text")
            setValues({ ...values, [name]: e.target.value });
        else
            setValues({ ...values, [name]: e.target.checked });
    }

    const addStudent = () => {
        setValues({ ...values, students: values.students.concat({ firstName: "", lastName: "" }) })
    }

    const deleteStudent = i => () => {
        if (values.students.length > 1) {
            let students = [...values.students];
            students.splice(i, 1);
            setValues({
                ...values,
                students: students
            })
        } else {
            props.snackbar.showMessage("error", "La salle doit contenir au minimum un étudiant");
        }
    }

    const updateRoom = () => {
        const data = {
            _id: props.match.params.id,
            newId: values._id !== props.match.params.id ? values._id : undefined,
            students: values.students,
            special: values.special
        }

        fetch(api.protocol + "://" + api.hostname + ":" + api.port + "/room/", {
            method: "PUT",
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
                props.snackbar.showMessage("success", "Salle mise à jour avec succès");
                if (data.newId)
                    setRedirection({ redirect: true, roomID: data.newId })
                else
                    setValues(res);
            })
            .catch(console.error)
    }

    if (redirection.redirect)
        return <Redirect to={"/edit/" + redirection.roomID} />

    return (
        <main className={classes.content}>
            <Grid container justify="center">
                <Grid item xs={12} md={10} lg={8}>
                    <Paper className={classes.root}>
                        <Grid container spacing={4}>
                            <Grid item xs={12}>
                                <Typography variant="h5" component="h3">
                                    Modification de la salle {props.match.params._id}
                                </Typography>
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    id="outlined-name"
                                    label="Identifiant"
                                    className={classes.textField}
                                    value={values._id}
                                    onChange={handleChangeTxt('_id')}
                                    margin="normal"
                                    variant="outlined"
                                />
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
                                <Button variant="contained" color="primary" className={classes.margin} onClick={addStudent}>
                                    <PersonAdd className={classes.leftIcon} />
                                    Ajouter un étudiant
                                </Button>
                            </Grid>

                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={
                                        <Checkbox color="primary" checked={values.special} className={classes.margin} onChange={handleChangeTxt('special')} />
                                    }
                                    label="Salle spéciale"
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <Success variant="contained" color="primary" className={classes.margin} onClick={updateRoom}>
                                    Mettre à jour la salle
                                </Success>
                                <Warning
                                    component={Link}
                                    to="/"
                                    variant="contained"
                                    color="primary"
                                    className={classes.margin}
                                >
                                    Annuler
                                </Warning>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </main>
    );
}

export default withSnackbar(EditRoom);