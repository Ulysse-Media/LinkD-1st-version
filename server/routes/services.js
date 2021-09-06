const express = require('express');
const router = express.Router();
const Services = require("../database-mysql/services/services");


// Api to post new service to database
router.post('/', function (req, res, next) {
    Services.addService(req.body).then(result => {
        try {
            return res.json(result);
        } catch (err) {
            console.log(err)
        }
    })
});

// Api to retrieve all services from database
router.get('/', function (req, res, next) {
    Services.getServices().then(result => {
        try {
            return res.json(result);
        } catch (err) {
            console.log(err)
        }
    })
});

module.exports = router;