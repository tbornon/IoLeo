const AdminController = require('../Controllers/AdminController');

module.exports = app => {
    app.get("/", (req, res, next) => {
        res.json({ ok: 1, message: "API is up and running" });
    });

    app.route('/room')
        .get(AdminController.getRoomList)
        .put(AdminController.editRoom)
        .delete(AdminController.deleteRoom);
}