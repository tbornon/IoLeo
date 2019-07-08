const RoomController = require('../Controllers/RoomController');

module.exports = app => {
    app.get("/", (req, res, next) => {
        res.json({ ok: 1, message: "API is up and running" });
    });

    app.route('/room')
        .get(RoomController.getRoomList)
        .put(RoomController.editRoom)
        .delete(RoomController.deleteRoom);

    app.route('/room/:id')
        .get(RoomController.findRoomById);
}