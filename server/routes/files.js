const express = require('express');
const router = express.Router();
const Files = require("../database-mysql/files/files");
const _DIR = "./server/public";

// Api to post new doctor to database
router.post('/', function (req, res, next) {
    var imgURL = [];
    const files = req.files.imgCollection;
    if (files) {
        for (let i = 0; i < files.length; i++) {
            if (files[i].mimetype == "image/gif" || files[i].mimetype == "image/jpeg" || files[i].mimetype == "image/png") {
                files[i].mv(`${_DIR}/calendar/${files[i].name}`)
                imgURL.push(`/calendar/${files[i].name}`);
            }
        }
        req.body.fileUpload = imgURL;
    }
    Files.addFile(req.body).then(result => {
        try {
            return res.json(result);
        } catch (err) {
            console.log(err)
        }
    })
});

// Api to post new doctor to database
router.get('/', function (req, res, next) {
    Files.retrieveFile(req.query.action_id).then(result => {
        try {
            return res.json(result);
        } catch (err) {
            console.log(err)
        }
    })
});

module.exports = router;