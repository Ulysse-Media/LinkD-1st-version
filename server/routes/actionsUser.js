const express = require('express');
const router = express.Router();
const Actions = require("../database-mysql/actions/actions");

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
    Actions.validateActionById(req.query.action_id).then((result, error) => {
        if (result) {
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