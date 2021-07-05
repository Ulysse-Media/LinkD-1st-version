const express = require('express');
const router = express.Router();
const Users = require("../database-mysql/users/users.js");
const jwt = require("jsonwebtoken");
const async = require('async');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const { connection } = require("../database-mysql/config/connect");

// Api to register user
router.post('/signup', function (req, res, next) {
    Users.signupClient(req.body).then(result => {
        if (result.alert) {
            return res.json({ DuplicateAlert: true })
        } else {
            return res.json(result);
        }
    })
});

// Api to Login user
router.post('/login', function (req, res, next) {
    Users.loginClient(req.body).then(result => {
        var user = result[0];
        if (user) {
            delete user.user_password;
            let token = jwt.sign({ user_id: user.user_id }, "Secret key"); // JWT Token 
            return res.json({ user, token })
        } else {
            return res.json(result.alert)
        }
    })
});

// Api to retrieve all users from database
router.get('/', (req, res, next) => {
    Users.getClients(req.body).then(result => {
        return res.json(result);
    })
});

// Api to retrive user by it's ID
router.post('/user', function (req, res, next) {
    Users.getClient(req.query.user_id).then(result => {
        return res.json(result);
    })
});

// Api to logout user
router.get('/logout', function (req, res, next) {
    delete req.headers.authorization;
    return res.json({ message: 'Logged out successfully' });
});

// Api to handle redirection password reinitialization
router.post('/forgot', function (req, res, next) {
    var alert = "";
    async.waterfall([
        function (done) {
            crypto.randomBytes(20, function (err, buf) {
                var token = buf.toString('hex');
                done(err, token);
            });
        },
        function (token, done) {
            Users.getClientByEmail(req.body).then((user, err) => {
                if (!user[0]) {
                    req.flash('error', 'No account with that email address exists.');
                    alert = "Cette adresse Email n'appartient a aucun compte"
                    return res.json({ alert: alert })
                } else {
                    req.body.resetPasswordToken = token
                    req.body.resetPasswordExpires = Date.now() + 3600000; // 1 hour
                    Users.saveClientResetCredentials(req.body).then((result, err) => {
                        if(result) {
                            Users.getClientByEmail(req.body).then((usr, error) => {
                                if(usr[0]) {
                                    done(err, token, usr);
                                    return res.json(usr[0])
                                } else {
                                    console.log("not found");
                                }
                            })
                        } else {
                            console.log("err", err)
                        }
                    });
                }
            });
        },
        function (token, usr, done) {
            var smtpTrans = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: 'yknaizia@gmail.com',
                    pass: 'yass94683607'
                }
            });
            var mailOptions = {
                to: usr[0].user_email,
                from: 'yknaizia@gmail.com',
                subject: 'Node.js Password Reset',
                text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
                    'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                    'http://localhost:3000' + '/reset/' + token + '\n\n' +
                    'If you did not request this, please ignore this email and your password will remain unchanged.\n'

            };
            smtpTrans.sendMail(mailOptions, function (err, info) {
                if (err) {
                    done(err)
                } else {
                    req.flash('success', 'An e-mail has been sent to ' + usr[0].user_email + ' with further instructions.');
                    res.redirect('/forgot');
                }
            });
        }
    ], function (err) {
        res.redirect('/');
    });
});

// Api to handle password reinitialization
router.post('/reset/:token', function (req, res) {
    async.waterfall([
        function (done) {
            Users.getClientByResetPasswordToken(req.query.resetPasswordToken).then((user, err, next) => {
                if (!user[0]) {
                    req.flash('error', 'Password reset token is invalid or has expired.');
                    return res.redirect('/forgot');
                }
                req.body.user_email = user[0].user_email;
                req.body.resetPasswordToken = undefined;
                req.body.resetPasswordExpires = undefined;
                Users.updateClientPassword(req.body).then((user, err, next) => {
                    if (err) {
                        console.log(err);
                        res.redirect('/forgot');
                    } else {
                        Users.loginClient(req.body).then((user, error) => {
                            var usr = user[0];
                            if (usr) {
                                delete usr.user_password;
                                let token = jwt.sign({ user_id: usr.user_id }, "Secret key"); // JWT Token
                                done(err, usr, token);
                            } else {
                                return res.json(usr.alert)
                            }
                        })
                    }
                })
            });
        },
        function (user, token, done) {
            if(user){
                var smtpTrans = nodemailer.createTransport({
                    service: 'Gmail',
                    auth: {
                        user: 'yknaizia@gmail.com',
                        pass: 'yass94683607'
                    }
                });
                var mailOptions = {
                    to: user.user_email,
                    from: 'yknaizia@gmail.com',
                    subject: 'Your password has been changed successfully',
                    text: 'Hello,\n\n' +
                        ' - This is a confirmation that the password for your account ' + user.user_email + ' has just been changed.\n'
                };
                smtpTrans.sendMail(mailOptions, function (err) {
                    done(err);
                });
                return res.json({user, token})
            } else {
              console.log("not found");  
            }
        }
    ], function (err) {
        res.redirect('/');
    });
});

module.exports = router;