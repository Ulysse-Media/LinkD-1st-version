const express = require('express');
const router = express.Router();
const Localisations = require("../database-mysql/localisation/localisation");

router.post('/', function (req, res, next) {
    Localisations.addLocalisation(req.body).then(result => {
        try {
            return res.json(result);
        } catch (err) {
            console.log(err)
        }
    })
});

router.get('/', function (req, res, next) {
    Localisations.getLocalisations().then(result => {
        try {
            return res.json(result);
        } catch (err) {
            console.log(err)
        }
    })
});


module.exports = router;