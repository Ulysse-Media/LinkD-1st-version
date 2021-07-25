const express = require('express');
const router = express.Router();
const Notifications = require("../database-mysql/notifications/notifications");

router.get('/:notification_recipient', function (req, res, next) {
    Notifications.getnotificationByUserId(req.query.notification_recipient).then(result => {
        try {
            return res.json(result);
        } catch (err) {
            console.log(err)
        }
    })
});

router.get('/last/notif', function (req, res, next) {
    Notifications.getLastNotification().then(result => {
        try {
            return res.json(result[0]);
        } catch (err) {
            console.log(err)
        }
    })
});

router.post('/:notification_id', function (req, res, next) {
    Notifications.markAsReadNotification(req.query.notification_id).then(result => {
        try {
            return res.json(result);
        } catch (err) {
            console.log(err)
        }
    })
});

module.exports = router;




