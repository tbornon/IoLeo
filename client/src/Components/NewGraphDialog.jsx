import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';

import { SuccessSimple, DangerSimple } from "./Buttons";
import { withSnackbar } from "./SnackbarProvider";

import { api } from "../config";

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        minWidth: 120,
        width: "100%"
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

function NewGraphDialog(props) {
    const classes = useStyles();
    const [values, setValues] = React.useState({ variable: "", title: "",width: 6 });

    function handleClose() {
        props.setOpen(false);
    }

    const handleChange = name => e => {
        setValues({ ...values, [name]: e.target.value });
    }

    function addGraph() {
        if (values.name !== "" && values.title !== "") {
            const data = {
                ...values
            }

            fetch(api.protocol + "://" + api.hostname + ":" + api.port + "/room/" + props.roomID + "/graph", {
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
                    props.snackbar.showMessage("success", "Graph créée avec succès");
                    setValues({ variable: "" });
                    props.setRoom(res);
                    handleClose();
                })
                .catch(err => {
                    console.error(err);
                    err.json().then(msg => {
                        console.error(err);
                    });
                });
        } else {
            props.snackbar.showMessage("error", "Tous les champs doivent être remplis");
        }
    }

    return (
        <Dialog open={props.open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Créer un nouveau graphique</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Associer une variable à un nouveau graphique
                </DialogContentText>

                <TextField
                    margin="dense"
                    label="Nom du graphique"
                    type="text"
                    value={values.title}
                    onChange={handleChange("title")}
                    fullWidth
                />

                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="variable">Nom de la variable</InputLabel>
                    <Select
                        value={values.variable}
                        onChange={handleChange("variable")}
                    >
                        {props.variables.map(variable =>
                            <MenuItem
                                key={variable.name}
                                value={variable.name}
                            >
                                {variable.name + " (" + variable.unit + ")"}
                            </MenuItem>
                        )}
                    </Select>
                </FormControl>

                <TextField
                    margin="dense"
                    label="Largeur du graphique (entre 1 et 12)"
                    type="text"
                    value={values.width}
                    onChange={handleChange("width")}
                    fullWidth
                />

            </DialogContent>
            <DialogActions>
                <DangerSimple onClick={handleClose} color="primary">
                    Annuler
                </DangerSimple>
                <SuccessSimple onClick={addGraph} color="primary">
                    Créer
                </SuccessSimple>
            </DialogActions>
        </Dialog>
    );
}

export default withSnackbar(NewGraphDialog)