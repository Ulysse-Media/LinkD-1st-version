const express = require('express');
const router = express.Router();
const Actions = require("../database-mysql/actions/actions");
const _DIR = "./server/public";

router.post('/', function (req, res, next) {
    var body = JSON.parse(req.body.values);
    if (!req.files) {
        return res.status(400).send("No files were uploaded.");
    }
    var file = req.files.file;
    if (file.mimetype == "image/gif" || file.mimetype == "image/jpeg" || file.mimetype == "image/png") {
        file.mv(`${_DIR}/calendar/${file.name}` , function (err) {
            console.log("error", err);
        });
        var imgURL = `calendar/${file.name}`;
        body.meeting_agenda = imgURL;
    } else {
        var message = "Please upload your file";
        return res.send({ message })
    }
    Actions.addAction(body).then(result => {
        console.log('result', result)
        try {
            return res.send(result);
        } catch (err) {
            console.log(err);
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