const express = require('express');
const router = express.Router();
const Users = require("../database-mysql/users/users.js");
const jwt = require("jsonwebtoken");

router.post('/signup', function (req, res, next) {
    Users.signupClient(req.body).then(result => {
        if (result.alert) {
            res.json({ DuplicateAlert: true })
        } else {
            res.json(result);
        }
    })
});

router.post('/login', function (req, res, next) {
    Users.loginClient(req.body).then(result => {
        var user = result[0];
        if(user) {
            delete user.user_password;
            let token = jwt.sign({ user_id: user.user_id }, "Secret key"); // JWT Token 
            return res.json({ user, token })
        } else {
            res.json(result.alert)
        }
    })
});


router.get('/', (req, res, next) => {
    Users.getClients(req.body).then(result => {
        return res.json(result);
    })
});

router.post('/user', function (req, res, next) {
    Users.getClient(req.query.user_id).then(result => {
        return res.json(result);
    })
});

router.get('/logout', function (req, res, next) {
    delete req.headers.authorization;
    return res.json({ message : 'Logged out successfully' });
});

module.exports = router;