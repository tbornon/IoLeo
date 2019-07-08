const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

const Room = require('./Models/Room');
const RoomRoutes = require('./Routes/RoomRoutes');

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/MKR", { useNewUrlParser: true })
    .then(() => {
        console.log("Connected to database");
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

RoomRoutes(app);

app.use(function (err, req, res, next) {
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

http.listen(3002, () => { })

app.listen(3001, () => {
    console.log("Server started listening on port 3001");
});