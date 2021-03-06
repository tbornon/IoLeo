const RoomController = require('../Controllers/RoomController');

module.exports = (app,io) => {
    app.get("/", (req, res, next) => {
        res.json({ ok: 1, message: "API is up and running" });
    });

    app.route('/room')
        .post(RoomController.createRoom);

    app.route('/room/:id')
        .get(RoomController.findRoomById);

    app.route('/room/:id/variable')
        .post(RoomController.createVariable)
        .delete(RoomController.removeVariable);

    app.route('/room/:id/graph')
        .post(RoomController.createGraph)
        .delete(RoomController.removeGraph);

    app.route('/room/:id/:variable/:value')
        .post(RoomController.createData(io));

}