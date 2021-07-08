const express = require('express');
const router = express.Router();
const Actions = require("../database-mysql/actions/actions");
const nodemailer = require('nodemailer');

// Api to retrieve action by user ID
router.get('/:user_id', function (req, res, next) {
    Actions.getActionByUserId(req.query.user_id).then(result => {
        try {
            return res.json(result);
        } catch (err) {
            console.log(err)
        }
    })
});

// Api to validate action by ID
router.post('/validated', function (req, res, next) {
    Actions.validateActionById(req.query.action_id, req.query.user_email).then((result, error) => {
        if (result) {
            var smtpTrans = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: 'yknaizia@gmail.com',
                    pass: 'yass94683607'
                }
            });
            var mailOptions = {
                to: req.query.user_email,
                from: 'yknaizia@gmail.com',
                subject: "Validation d'action",
                text: "Action validée avec succés.",

            };
            smtpTrans.sendMail(mailOptions, function (err, info) {
                if (err) {
                    done(err)
                } else {
                    req.flash('success', 'An e-mail has been sent to ' + req.query.user_email + ' with further instructions.');
                    res.redirect('/forgot');
                }
            });
            return res.json(result);
        } else {
            console.log("error", error)
        }
    })
});

// Api to validate action by ID
router.post('/denied', function (req, res, next) {
    Actions.denyActionById(req.query.action_id).then((result, error) => {
        if (result) {
            return res.json(result);
        } else {
            console.log("error", error)
        }
    })
});


module.exports = router;