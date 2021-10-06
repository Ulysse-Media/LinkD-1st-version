const express = require('express');
const router = express.Router();
const Invoices = require("../database-mysql/invoices/invoices");

// Api to post new invoice to database
router.post('/', function (req, res, next) {
    Invoices.addInvoice(req.body).then(result => {
        try {
            return res.json(result);
        } catch (err) {
            console.log(err)
        }
    })
});

// Api to post new invoice to database
router.get('/', function (req, res, next) {
    Invoices.retrieveInvoice(req.query.action_id).then(result => {
        try {
            return res.json(result);
        } catch (err) {
            console.log(err)
        }
    })
});

module.exports = router;