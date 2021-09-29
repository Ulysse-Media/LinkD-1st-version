const express = require('express');
const router = express.Router();
const Files = require("../database-mysql/files/files");
const _DIR = "./server/public";

// Api to post new doctor to database
router.post('/', function (req, res, next) {
    var imagesURL = [];
    var imageURL = "";
    const files = req.files.imgCollection;
    if (files.length) {
        for (let i = 0; i < files.length; i++) {
            if (files[i].mimetype == "image/gif" || files[i].mimetype == "image/jpeg" || files[i].mimetype == "image/png") {
                files[i].mv(`${_DIR}/calendar/${files[i].name}`)
                imagesURL.push(`/calendar/${files[i].name}`);
            }
        }
        req.body.fileUpload = imagesURL;
        Files.addFile(req.body).then(result => {
            try {
                return res.json(result);
            } catch (err) {
                console.log(err)
            }
        })
    } else {
        if (files.mimetype == "image/gif" || files.mimetype == "image/jpeg" || files.mimetype == "image/png") {
            files.mv(`${_DIR}/calendar/${files.name}`)
            imageURL = `/calendar/${files.name}`;
        }
        req.body.fileUpload = imageURL;
        Files.addFile(req.body).then(result => {
            try {
                return res.json(result);
            } catch (err) {
                console.log(err)
            }
        })
    }
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