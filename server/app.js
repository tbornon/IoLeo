const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

const roomSchema = new mongoose.Schema({
    _id: Number,
    students: [
        {
            firstName: {
                type: String,
                required: true,
            },
            lastName: {
                type: String,
                required: true,
            }
        }
    ],
    variables: [
        {
            name: {
                type: String,
                required: true,
            },
            unit: {
                type: String,
                required: true,
            }
        }
    ],
    datas: [
        {
            value: {
                type: String,
                required: true,
            },
            variable: {
                type: String,
                required: true,
            },
            date: {
                type: Date,
                default: Date.now()
            }
        }
    ],
    graphs: [
        {
            type: {
                type: String,
                required: true,
                default: "line"
            },
            variable: {
                type: String,
                required: true
            },
        }
    ]
});
var Room = mongoose.model('Room', roomSchema);

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/MKR", { useNewUrlParser: true })
    .then(() => {
        console.log("Connected to database");
    })
    .catch(console.error);

const getRoomList = (req, res, next) => {
    Room
        .find({})
        .select("_id students variables")
        .exec((err, rooms) => {
            if (err) next(err);
            else res.json(rooms || {});
        });
}

const createRoom = (req, res, next) => {
    const data = req.body;

    if (data.students && data.students.length > 0) {
        let valid = true;
        for (let i = 0; i < data.students.length; i++) {
            if (!data.students[i].firstName || !data.students[i].lastName) {
                valid = false;
                break;
            }
        }

        if (valid) {
            findUnusedId()
                .then(id => {
                    let room = new Room({
                        _id: id,
                        students: data.students
                    });

                    room.save(err => {
                        if (err) next(err)
                        else res.json(room);
                    });
                })
                .catch(next);
        } else {
            next(new Error("All students must have firstName and lastName"))
        }
    } else {
        next(new Error("MissingParameter"));
    }
}

const findUnusedId = () => {
    return new Promise((resolve, reject) => {
        let id = Math.round(Math.random() * 10000);

        Room.findById(id, (err, res) => {
            if (err) reject(err);
            else if (!res)
                resolve(id);
            else
                findUnusedId()
                    .then(resolve)
                    .catch(reject);
        })
    });
}

const findRoomById = (req, res, next) => {
    const data = req.params;

    Room.findById(data.id, (err, room) => {
        if (err) next(err)
        if (room) res.json(room);
        else next(new Error("RoomNotFound"));
    });
}

const createVariable = (req, res, next) => {
    const data = {
        id: req.params.id,
        ...req.body
    }

    if (data.name && data.unit) {
        comboExists(data.name, data.id)
            .then(exists => {
                if (exists) {
                    next(new Error("VariableAlreadyExists"));
                } else {
                    Room
                        .findById(data.id)
                        .exec((err, room) => {
                            if (err) next(err);
                            else if (room) {
                                room.variables.push({ name: data.name, unit: data.unit });

                                room.save((err, savedRoom) => {
                                    if (err) next(err);
                                    else res.json(savedRoom);
                                })
                            }
                            else next(new Error("RoomNotFound"));
                        });
                }
            })
            .catch(next);

    } else {
        next(new Error("MissingParameter"));
    }
}

const comboExists = (name, roomID) => {
    return new Promise((resolve, reject) => {
        Room.countDocuments({ _id: roomID, "variables.name": name }, (err, number) => {
            if (err) reject(err);
            else resolve(number >= 1);
        });
    });
}

const createData = (req, res, next) => {
    const data = req.params;
    console.log(data);
    if (data.variable && data.id && data.value) {
        comboExists(data.variable, data.id)
            .then(exists => {
                if (exists) {
                    let newData = {
                        value: data.value,
                        variable: data.variable,
                        date: Date.now()
                    }

                    io.sockets.in(data.id).emit('data', newData);

                    Room.updateOne({ _id: data.id },
                        {
                            $push: {
                                datas: newData
                            }
                        }, err => {
                            if (err) next(err);
                            else res.json({ ok: 1 });
                        });
                } else {
                    next(new Error("RoomOrVariableNotFound"));
                }
            })
            .catch(next);
    } else {
        next(new Error("MissingParameter"));
    }
}

const createGraph = (req, res, next) => {
    const data = {
        ...req.body,
        id: req.params.id,
    }

    console.log("data : ", data)

    if (data.variable) {
        Room.findById(data.id, (err, room) => {
            if (err) next(err)
            else if (room) {
                let graph = req.body;

                room.graphs.push(graph);

                room.save((err, savedRoom) => {
                    if (err) next(err)
                    else res.json(savedRoom);
                })
            }
            else next(new Error("RoomNotFound"));
        });
    }
}

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

app.get("/", (req, res, next) => {
    res.json({ ok: 1, message: "API is up and running" });
});

app.route('/room')
    .get(getRoomList)
    .post(createRoom);

app.route('/room/:id')
    .get(findRoomById);

app.route('/room/:id/variable')
    .post(createVariable);

app.route('/room/:id/graph')
    .post(createGraph);

app.route('/room/:id/:variable/:value')
    .post(createData);


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