const express = require('express');
const router = express.Router();
const Notifications = require("../database-mysql/notifications/notifications");

router.get('/:notification_recipient', function (req, res, next) {
    Notifications.getnotificationByRecipient(req.query.notification_recipient).then(result => {
        try {
            return res.json(result);
        } catch (err) {
            console.log(err)
        }
    })
});

router.post('/action/:notification_sender', function (req, res, next) {
    Notifications.getnotificationBySender(req.query.notification_sender).then(result => {
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

router.post('/action/read/:notification_id', function (req, res, next) {
    Notifications.markAsReadNotification(req.query.notification_id).then(result => {
        try {
            return res.json(result);
        } catch (err) {
            console.log(err)
        }
    })
});

module.exports = router;




