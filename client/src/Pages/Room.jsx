import React, { useEffect } from 'react';
import { Redirect } from "react-router-dom";
import { Line } from 'react-chartjs-2';
import socketIOClient from "socket.io-client";

import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';

import NewVarDialog from "../Components/NewVarDialog";
import NewGraphDialog from "../Components/NewGraphDialog";
import SpeedDial from "../Components/SpeedDial";
import Chart from "../Components/Chart";
import { withSnackbar } from "../Components/SnackbarProvider";

import { api } from "../config";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        paddingTop: theme.spacing(10),
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
    },
    toolbar: theme.mixins.toolbar,
}));
/*
const data = {
    labels: Object.keys(rawData).map(key => new Date(key).toLocaleString()),
    datasets: [
        {
            label: 'My First dataset',
            fill: true,
            lineTension: 0.5,
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: Object.keys(rawData).map(key => Math.round(rawData[key].temperature.sol) / 10)
        }
    ]
};*/

function Room(props) {
    const classes = useStyles();
    const [newVar, setNewVar] = React.useState(false);
    const [newGraph, setNewGraph] = React.useState(false);
    const [redirect, setRedirect] = React.useState(false);
    const [room, setRoom] = React.useState({
        students: [{ lastName: "", firstName: "" }],
        variables: [{ name: "", unit: "" }],
        datas: [{ value: "", variable: "", date: Date.now() }],
        graphs: []
    });
    const [newData, setNewData] = React.useState({ date: Date.now(), value: 0, variable: "" })
    const params = props.match.params;

    //const socket = socketIOClient(api.protocol + "://" + api.hostname + ":3002");

    useEffect(() => {
        fetch(api.protocol + "://" + api.hostname + ":" + api.port + "/room/" + params.id, {
            method: "GET"
        })
            .then(res => {
                if (!res.ok) throw res;
                else return res.json();
            })
            .then(res => {
                setRoom({ ...res });
            })
            .catch(err => {
                err.json()
                    .then(msg => {
                        if (msg.message === "RoomNotFound") {
                            props.snackbar.showMessage("error", "Aucune salle n'existe avec cet identifiant")
                            setRedirect(true);
                        }
                    });
            })
    }, [params.id, props.snackbar]);

    useEffect(() => {
        const socket = socketIOClient(api.protocol + "://" + api.hostname + ":3002");

        socket.emit("room", params.id);
        socket.on("data", data => setNewData(data));

        return () => socket.disconnect()
    }, [])

    /*useEffect(() => {
        const interval = setInterval(() => {
            setNewData({
                variable: "temp",
                value: newData.value + 1,
                date: Date.now()
            });
        }, 5000);

        return () => clearInterval(interval);
    })*/

    if (redirect)
        return <Redirect to="/join" />

    return (
        <div className={classes.root}>
            <NewVarDialog
                open={newVar}
                setOpen={setNewVar}
                setRoom={setRoom}
                roomID={params.id}
            />
            <NewGraphDialog
                open={newGraph}
                setOpen={setNewGraph}
                setRoom={setRoom}
                roomID={params.id}
                variables={room.variables}
            />
            <SpeedDial newVar={() => setNewVar(true)} newGraph={() => setNewGraph(true)} />
            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.toolbar} />
                <List>
                    <ListItem>
                        <ListItemText primary={"Identifiant de la salle :"} />
                        <ListItemText primary={params.id} />
                    </ListItem>
                </List>
                <Divider />
                <List>
                    <ListItem>
                        <ListItemText primary={"Etudiants :"} />
                    </ListItem>
                    {
                        room.students.map(student =>
                            <ListItem key={student._id || Date.now()}>
                                <ListItemText primary={student.lastName.toUpperCase() + " " + student.firstName} />
                            </ListItem>
                        )
                    }
                </List>
                <Divider />
                <List>
                    <ListItem>
                        <ListItemText primary={"Dernier message reçu"} />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary={room.datas.length > 0 ? "le " + (new Date(room.datas[room.datas.length - 1].date)).toLocaleString() : "n/a"} />
                    </ListItem>
                </List>
            </Drawer>
            <main className={classes.content}>
                <Grid container alignItems="center">
                    <Grid item xs={12} md={10} lg={6}>
                        {room.graphs.map(graph =>
                            <Chart
                                key={graph._id}
                                data={room.datas.filter(data => data.variable === graph.variable)}
                                newData={newData}
                                variable={{ name: graph.variable }}
                            />
                        )}
                    </Grid>
                </Grid>
            </main>
        </div>
    );
}

export default withSnackbar(Room);