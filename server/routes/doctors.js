const express = require('express');
const router = express.Router();
const Doctors = require("../database-mysql/doctors/doctors");

router.post('/', function (req, res, next) {
    Doctors.addDoctor(req.body).then(result => {
        try {
            return res.json(result);
        } catch (err) {
            console.log(err)
        }
    })
});

router.get('/', function (req, res, next) {
    Doctors.getDoctors().then(result => {
        try {
            return res.json(result);
        } catch (err) {
            console.log(err)
        }
    })
});

router.get('/last', function (req, res, next) {
    Doctors.getLastDoctor().then(result => {
        try {
            return res.json(result);
        } catch (err) {
            console.log(err)
        }
    })
});


module.exports = router;