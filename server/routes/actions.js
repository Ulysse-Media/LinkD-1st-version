const express = require('express');
const router = express.Router();
const Actions = require("../database-mysql/actions/actions");

router.post('/', function (req, res, next) {
    Actions.addAction(req.body).then(result => {
        try {
            return res.json(result);
        } catch (err) {
            console.log(err)
        }
    })
});

router.get('/', function (req, res, next) {
    Actions.getActions().then(result => {
        try {
            return res.json(result);
        } catch (err) {
            console.log(err)
        }
    })
});

router.get('/last', function (req, res, next) {
    Actions.getLastAction().then(result => {
        try {
            return res.json(result);
        } catch (err) {
            console.log(err)
        }
    })
});

module.exports = router;