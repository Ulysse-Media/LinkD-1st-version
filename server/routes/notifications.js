const express = require('express');
const router = express.Router();
const Notifications = require("../database-mysql/notifications/notifications");

router.get('/api/notifications', function (req, res, next) {
    Notifications.getnotificationByUserId(req.query.notification_recipient).then(result => {
        try {
            return res.json(result);
        } catch (err) {
            console.log(err)
        }
    })
});

module.exports = router;




