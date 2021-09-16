const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

// Api to post new mail for archieved actions
router.post('/archieved/actions', function (req, res, next) {
    var smtpTrans = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'yknaizia@gmail.com',
            pass: 'yassine94683607'
        }
    });
    var mailOptions = {
        to: [req.query.action_sender],
        from: 'yknaizia@gmail.com',
        subject: "Archivage d'action",
        text: `Rappel : Veuillez archiver vos actions terminées et non archivées SVP!..`,
    };
    smtpTrans.sendMail(mailOptions, function (err, info) {
        if (err) {
            console.log(err)
        } else {
            req.flash('success', 'An e-mail has been sent to ' + req.query.action_sender + ' with further instructions.');
        }
    });
});

// Api to post new mail for not validated actions
router.post('/notValidated/actions', function (req, res, next) {
    var smtpTrans = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'yknaizia@gmail.com',
            pass: 'yassine94683607'
        }
    });
    var mailOptions = {
        to: [req.query.action_sender],
        from: 'yknaizia@gmail.com',
        subject: "Validation d'action",
        text: `Rappel : Veuillez valider vos actions non validées SVP!..`,
    };
    smtpTrans.sendMail(mailOptions, function (err, info) {
        if (err) {
            console.log(err)
        } else {
            req.flash('success', 'An e-mail has been sent to ' + req.query.action_sender + ' with further instructions.');
        }
    });
});



module.exports = router;