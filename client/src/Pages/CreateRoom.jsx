import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import PersonAdd from '@material-ui/icons/PersonAdd';

import { Danger, Success } from "../Components/Buttons"

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

export default function CreateRoom() {
    const classes = useStyles();
    const [values, setValues] = React.useState({
        students: [{ firstName: "", lastName: "" }]
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
                                                value={student.firstName}
                                                onChange={handleChange('firstName', i)}
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
                                                value={student.lastName}
                                                onChange={handleChange('lastName', i)}
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
                                <Success variant="contained" color="primary" className={classes.margin} onClick={addStudent}>
                                    Créer la salle
                            </Success>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </main>
    );
}