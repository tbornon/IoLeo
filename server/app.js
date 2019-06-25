const express = require('express');
const app = express();

app.get("/", (req, res, next) => {
    res.json({ ok: 1, message: "API is up and running" });
});





app.listen(3001, () => {
    console.log("Server started listening on port 3001");
});