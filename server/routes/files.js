const express = require('express');
const router = express.Router();
const Files = require("../database-mysql/files/files");
const _DIR = "./server/public";

// Api to post new doctor to database
router.post('/', function (req, res, next) {
    console.log(req.files.file)
    var imgURL = "";
    // var file = req.files.file;
    // if (req.files) {
    //     imgURL = `/calendar/${file.name}`;
    //     if (file.mimetype == "image/gif" || file.mimetype == "image/jpeg" || file.mimetype == "image/png") {
    //         file.mv(`${_DIR}/calendar/${file.name}`);
    //         imgURL = `/calendar/${file.name}`;
    //         req.body.fileUpload = imgURL;
    //     }
    // }
    // Files.addFile(req.body).then(result => {
    //     try {
    //         return res.json(result);
    //     } catch (err) {
    //         console.log(err)
    //     }
    // })
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