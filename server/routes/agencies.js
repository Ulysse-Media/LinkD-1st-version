const express = require('express');
const router = express.Router();
const Agencies = require("../database-mysql/agencies/agencies");


// Api to post new agency to database
router.post('/', function (req, res, next) {
    Agencies.addAgency(req.body).then(result => {
        try {
            return res.json(result);
        } catch (err) {
            console.log(err)
        }
    })
});

// Api to retrieve all agencies from database
router.get('/', function (req, res, next) {
    Agencies.getAgencies().then(result => {
        try {
            return res.json(result);
        } catch (err) {
            console.log(err)
        }
    })
});

module.exports = router;