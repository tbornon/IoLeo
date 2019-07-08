const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    _id: String,
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
            displayName: {
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
            title: {
                required: true,
                type: String
            },
            type: {
                type: String,
                required: true,
                default: "line"
            },
            variable: {
                type: String,
                required: true
            },
            width: {
                type: Number,
                required: true,
                default: 6
            }
        }
    ],
    special: {
        type: Boolean,
        required: true,
        default: false
    }
});

var Room = mongoose.model('Room', roomSchema);

module.exports = Room;