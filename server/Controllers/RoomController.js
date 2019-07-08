const mongoose = require('mongoose');
const Room = mongoose.model('Room');

exports.getRoomList = (req, res, next) => {
    Room
        .find({})
        .select("students _id")
        .exec((err, rooms) => {
            if (err)
                next(err);
            else if (rooms)
                res.json(rooms)
        });
}


exports.createRoom = (req, res, next) => {
    const data = req.body;
    console.log(data)

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

exports.findRoomById = (req, res, next) => {
    const data = req.params;

    Room.findById(data.id, (err, room) => {
        if (err) next(err)
        if (room) res.json(room);
        else next(new Error("RoomNotFound"));
    });
}

exports.editRoom = (req, res, next) => {
    const data = req.body;

    if (data._id) {
        Room.findById(data._id, (err, room) => {
            if (err) next(err);
            else if (room) {
                let roomToUpdate = room;
                if (data.newId) {
                    roomToUpdate = new Room({
                        ...room,
                        _id: data.newId
                    });

                    Room.findByIdAndDelete(room._id, err => { if (err) next(err); });
                }

                if (data.students) roomToUpdate.students = data.students;
                if (data.newId) roomToUpdate._id = data.newId;
                if (data.special) roomToUpdate.special = data.special;

                roomToUpdate.save((err, savedRoom) => {
                    if (err) next(err);
                    else res.json(savedRoom);
                });
            } else {
                next(new Error("RoomNotFound"));
            }
        })
    }
}

exports.deleteRoom = (req, res, next) => {
    if (req.body._id) {
        Room.deleteOne({ _id: req.body._id }, err => {
            if (err) next(err);
            else res.json({ ok: 1 });
        });
    } else {
        next(new Error("Missing parameter _id"));
    }
}

exports.createVariable = (req, res, next) => {
    const data = {
        id: req.params.id,
        ...req.body
    }

    if (data.name && data.unit && data.displayName) {
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
                                room.variables.push({ ...data });

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

exports.removeVariable = (req, res, next) => {
    const data = {
        roomID: req.params.id,
        ...req.body
    }

    if (data.variableID) {
        Room.findById(data.roomID, (err, room) => {
            if (err) next(err);
            else if (room) {
                let variable;
                for (let i = 0; i < room.variables.length; i++) {
                    if (data.variableID == room.variables[i]._id) {
                        variable = room.variables[i];
                        break;
                    }
                }

                if (variable) {
                    room.datas = room.datas.filter(data => data.variable != variable.name);

                    room.variables = room.variables.filter(variable => variable._id != data.variableID);

                    room.save((err, savedRoom) => {
                        if (err) next(err);
                        else res.json(savedRoom);
                    })
                } else {
                    next(new Error("VariableNotFound"));
                }
            } else {
                next(new Error("RoomNotFound"));
            }
        });
    } else {
        next(new Error("MissingID"));
    }
}

exports.createGraph = (req, res, next) => {
    const data = {
        ...req.body,
        id: req.params.id,
    }

    if (data.variable && data.title) {
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

exports.removeGraph = (req, res, next) => {
    const data = { ...req.body, roomID: req.params.id };

    if (data.graphID) {
        Room.findById(data.roomID, (err, room) => {
            if (err) next(err)
            else if (room) {
                room.graphs = room.graphs.filter(graph => graph._id != data.graphID);

                room.save((err, savedRoom) => {
                    if (err) next(err);
                    else res.json(savedRoom);
                })
            } else {
                next(new Error("RoomNotFound"));
            }
        });
    } else {
        next(new Error("MissingID"));
    }
}

exports.createData = (req, res, next) => {
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

const comboExists = (name, roomID) => {
    return new Promise((resolve, reject) => {
        Room.countDocuments({ _id: roomID, "variables.name": name }, (err, number) => {
            if (err) reject(err);
            else resolve(number >= 1);
        });
    });
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