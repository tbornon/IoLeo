import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button'

import { Warning, Danger } from "../Components/Buttons"

import { api } from "../config";

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing(10),
        overflowX: 'auto',
    },
    table: {
        minWidth: 650,
    },
}));

export default function SimpleTable() {
    const [state, setState] = useState({ rooms: [] });
    const classes = useStyles();

    useEffect(() => {
        fetch(api.protocol + "://" + api.hostname + ":" + api.port + "/room", {
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
                console.log(res);
                setState({ rooms: res });
            })
            .catch(console.error)
    }, []);

    return (
        <Grid container justify="center">
            <Grid item xs={12} md={10} lg={8}>
                <Paper className={classes.root}>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell align="right">Identifiant</TableCell>
                                <TableCell align="right">&Eacute;tudiant(s)</TableCell>
                                <TableCell align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {state.rooms.map(room => (
                                <TableRow key={room._id}>
                                    <TableCell align="right">{room._id}</TableCell>
                                    <TableCell align="right">{room.students.map(s => s.lastName.toUpperCase() + " " + s.firstName).join(",")}</TableCell>
                                    <TableCell align="right">
                                        <Button
                                            component="a"
                                            target="_blank"
                                            href={"http://localhost:3000/room/" + room._id}
                                            variant="contained" color="primary"
                                            className="primary"
                                        >
                                            Rejoindre la salle
                                          </Button>
                                        <Warning
                                            component={Link}
                                            to={"/edit/" + room._id}
                                            variant="contained"
                                            style={{ marginLeft: "10px" }}
                                            color="primary"
                                        >
                                            Modifier
                                        </Warning>
                                        <Danger variant="contained" style={{ marginLeft: "10px" }} color="primary" >Supprimer</Danger>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
            </Grid>
        </Grid>
    );
}