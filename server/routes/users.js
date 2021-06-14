const express = require('express');
const router = express.Router();
const Users = require("../database-mysql/users/users.js");

router.post('/signup', function (req, res, next) {
    Users.signupClient(req.body).then(result => {
        res.json(result)
    })
});

router.get('/',  (req, res, next) => {
    Users.getClients(req.body).then(result => {
        return res.json(result);
    })
});

router.get('/client', function (req, res, next) {
    Users.getClient(req.body.email).then(result => {
        return res.json(result);
    })
});



module.exports = router;