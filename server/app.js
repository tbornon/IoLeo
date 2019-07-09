const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const appAdmin = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

const config = require('./config');
const Room = require('./Models/Room');
const RoomRoutes = require('./Routes/RoomRoutes');
const AdminRoutes = require('./Routes/AdminRoutes');

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/MKR", { useNewUrlParser: true })
    .then(() => {
        console.log("Connected to database");


        app.listen(config.client.port, config.client.ip, () => {
            console.log("Client API started listening on http://%s:%s", config.client.ip, config.client.port)
        });

        http.listen(config.socket.port, config.socket.ip, () => {
            console.log("SocketIO started listening on http://%s:%s", config.socket.ip, config.socket.port)
        });

        appAdmin.listen(config.admin.port, config.admin.ip, () => {
            console.log("Admin API started listening on http://%s:%s", config.admin.ip, config.admin.port)
        });
    })
    .catch(console.error);


app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    if (req.method === 'OPTIONS')
        res.sendStatus(200);
    else
        next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

RoomRoutes(app, io);

app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.send({ message: err.message, name: err.name });
});

appAdmin.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    if (req.method === 'OPTIONS')
        res.sendStatus(200);
    else
        next();
});

appAdmin.use(bodyParser.urlencoded({ extended: false }));
appAdmin.use(bodyParser.json());

AdminRoutes(appAdmin);

appAdmin.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.send({ message: err.message, name: err.name });
});

io.on("connection", socket => {
    console.log("New client connected")
    socket.on("disconnect", () => console.log("Client disconnected"));
    socket.on("room", room => socket.join(room));
});