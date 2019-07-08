import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

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

function DeleteDialog(props) {
    const classes = useStyles();
    const [values, setValues] = React.useState({ _id: "" });

    function handleClose() {
        props.setOpen(false);
    }

    const handleChange = name => e => {
        setValues({ ...values, [name]: e.target.value });
    }

    function remove() {
        if (values._id !== "") {
            let data = {};
            if (props.type === "variable")
                data.variableID = values._id;
            else if (props.type === "graph")
                data.graphID = values._id;

            let url;
            if (props.type === "variable")
                url = api.protocol + "://" + api.hostname + ":" + api.port + "/room/" + props.roomID + "/variable";
            else if (props.type === "graph")
                url = api.protocol + "://" + api.hostname + ":" + api.port + "/room/" + props.roomID + "/graph";

            fetch(url, {
                method: "DELETE",
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
                    if (props.type === "variable")
                        props.snackbar.showMessage("success", "Variable supprimée avec succès");
                    else if (props.type === "graph")
                        props.snackbar.showMessage("success", "Graphique supprimé avec succès");
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

    let content = "";
    if (props.type === "variable") {
        content = (
            <>
                <DialogTitle id="form-dialog-title">Supprimer une variable</DialogTitle>
                <DialogContent>
                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="variable">Nom de la variable</InputLabel>
                        <Select
                            value={values._id}
                            onChange={handleChange("_id")}
                        >
                            {props.variables.map(variable =>
                                <MenuItem
                                    key={variable._id}
                                    value={variable._id}
                                >
                                    {variable.name + " (" + variable.unit + ")"}
                                </MenuItem>
                            )}
                        </Select>
                    </FormControl>
                </DialogContent>
            </>
        );
    } else if (props.type === "graph") {
        content = (
            <>
                <DialogTitle id="form-dialog-title">Supprimer un graphique</DialogTitle>
                <DialogContent>
                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="variable">Nom du graphique</InputLabel>
                        <Select
                            value={values._id}
                            onChange={handleChange("_id")}
                        >
                            {props.graphs.map(graph =>
                                <MenuItem
                                    key={graph._id}
                                    value={graph._id}
                                >
                                    {graph.title}
                                </MenuItem>
                            )}
                        </Select>
                    </FormControl>
                </DialogContent>
            </>
        );
    }

    console.log(props);

    return (
        <Dialog open={props.open} onClose={handleClose} aria-labelledby="form-dialog-title">
            {content}
            <DialogActions>
                <SuccessSimple onClick={handleClose} color="primary">
                    Annuler
                </SuccessSimple>
                <DangerSimple onClick={remove} color="primary">
                    Supprimer
                </DangerSimple>
            </DialogActions>
        </Dialog>
    );
}

export default withSnackbar(DeleteDialog)