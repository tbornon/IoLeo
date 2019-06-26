const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

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
    console.log(data);

    if (data.students && data.students.length > 0) {
        let valid = true;
        for (let i = 0; i < data.students.length; i++) {
            if (!data.students[i].firstName || !data.students[i].lastName) {
                valid = false;
                break;
            }
        }
        console.log("est valide : ", valid);
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
        else res.json(room || {});
    });
}

const createVariable = (req, res, next) => {
    const data = {
        id: req.params.id,
        variable: req.body.variable
    }

    if (data.variable && data.variable.name && data.variable.unit) {
        Room
            .findById(data.id)
            .exec((err, room) => {
                if (err) next(err);
                else if (room) {
                    room.variables.push(data.variable);

                    room.save((err, savedRoom) => {
                        if (err) next(err);
                        else res.json(savedRoom);
                    })
                }
                else next(new Error("RoomNotFound"));
            });
    } else {
        next(new Error("MissingParameter"));
    }
}

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
    .post(createVariable)

app.route('/room/:id/:varible')
    .post(/* Add new data */);


app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.send({ message: err.message, name: err.name });
});

app.listen(3001, () => {
    console.log("Server started listening on port 3001");
});