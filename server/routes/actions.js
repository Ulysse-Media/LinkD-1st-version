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

router.post('/uploadFile', function (req, res) {
    if (!req.files) {
        return res.status(400).send("No files were uploaded.");
    }
    var file = req.files.file;
    if (file.mimetype == "image/gif" || file.mimetype == "image/jpeg" || file.mimetype == "image/png") {
        file.mv("client/public/uploads/" + file.name, function (err) {
            var imgURL = "client/public/uploads/" + file.name;
            Actions.insertFileUpload(imgURL).then(result => {
                try {
                    return res.json(result);
                } catch (err) {
                    console.log(err);
                }
            })
        });
    } else {
        var message = "Please upload your file";
        res.send({ message })
    }
});

module.exports = router;