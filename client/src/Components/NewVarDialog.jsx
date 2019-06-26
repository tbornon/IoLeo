import React from 'react';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { SuccessSimple, DangerSimple } from "./Buttons";

export default function NewVarDialog(props) {
    function handleClose() {
        props.setOpen(false);
    }

    return (
        <Dialog open={props.open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Créer une nouvelle variable</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Cette nouvelle variable vous permettra d'envoyer d'autres types de données depuis votre Arduino MKR
                </DialogContentText>
                <TextField
                    margin="dense"
                    id="name"
                    label="Nom de la variable"
                    type="text"
                    fullWidth
                />
                <TextField
                    margin="dense"
                    id="unit"
                    label="Unité"
                    type="text"
                    fullWidth
                />
            </DialogContent>
            <DialogActions>
                <DangerSimple onClick={handleClose} color="primary">
                    Annuler
                </DangerSimple>
                <SuccessSimple onClick={handleClose} color="primary">
                    Créer
                </SuccessSimple>
            </DialogActions>
        </Dialog>
    );
}
