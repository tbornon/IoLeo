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

exports.editRoom = (req, res, next) => {
    //
}