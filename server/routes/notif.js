const express = require('express');
const router = express.Router();
const Notifications = require("../database-mysql/notifications/notifications");

module.exports = function (io) {
    // Api to push new notification to database
    router.post('/api/notifications', function (req, res, next) {
        Notifications.pushNotification(req.body).then(result => {
            try {
                if (result) {
                    io.on("connection", (socket) => {
                        console.log("User connected")
                    });
                    io.sockets.emit("VALIDATION", req.body);
                    return res.json(result);
                }
            } catch (err) {
                console.log(err)
            }
        })
    });
    return router;
};



