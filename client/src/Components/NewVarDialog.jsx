import React from 'react';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { withSnackbar } from './SnackbarProvider';
import { SuccessSimple, DangerSimple } from "./Buttons";

import { api } from "../config";

function NewVarDialog(props) {
    const [variable, setVariable] = React.useState({ name: "", unit: "", displayName:"" })

    function handleClose() {
        props.setOpen(false);
    }

    const handleChange = name => e => {
        setVariable({ ...variable, [name]: e.target.value })
    }

    function createNewVar() {
        if (variable.name !== "" && variable.unit !== "" && variable.displayName !== "") {
            const data = { ...variable };

            fetch(api.protocol + "://" + api.hostname + ":" + api.port + "/room/" + props.roomID + "/variable", {
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
                    props.snackbar.showMessage("success", "Variable créée avec succès");
                    setVariable({ name: "", unit: "" });
                    props.setRoom(res)
                    handleClose();
                })
                .catch(err => {
                    err.json().then(msg => {
                        if (msg.message === "VariableAlreadyExists")
                            props.snackbar.showMessage("error", "Une variable existe déjà avec ce nom");
                    });
                });
        } else {
            props.snackbar.showMessage("error", "Tous les champs doivent être remplis");
        }
    }

    return (
        <Dialog open={props.open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Créer une nouvelle variable</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Cette nouvelle variable vous permettra d'envoyer d'autres types de données depuis votre Arduino MKR.
                    <br />Il est recommandé de ne pas mettre d'accent ou de caractères spéciaux dans le nom de la variable.
                </DialogContentText>
                <TextField
                    margin="dense"
                    id="name"
                    label="Nom de la variable"
                    type="text"
                    value={variable.name}
                    onChange={handleChange("name")}
                    fullWidth
                />
                <TextField
                    margin="dense"
                    id="displayName"
                    label="Nom d'affichage de la variable"
                    type="text"
                    value={variable.displayName}
                    onChange={handleChange("displayName")}
                    fullWidth
                />
                <TextField
                    margin="dense"
                    id="unit"
                    label="Unité"
                    type="text"
                    value={variable.unit}
                    onChange={handleChange("unit")}
                    fullWidth
                />
            </DialogContent>
            <DialogActions>
                <DangerSimple onClick={handleClose} color="primary">
                    Annuler
                </DangerSimple>
                <SuccessSimple onClick={createNewVar} color="primary">
                    Créer
                </SuccessSimple>
            </DialogActions>
        </Dialog>
    );
}

export default withSnackbar(NewVarDialog);