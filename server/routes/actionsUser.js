const express = require('express');
const router = express.Router();
const Actions = require("../database-mysql/actions/actions");
const nodemailer = require('nodemailer');

// Api to retrieve action by user ID
router.get('/:user_id', function (req, res, next) {
    Actions.getActionByUserId(req.query.user_id).then(result => {
        try {
            return res.json(result);
        } catch (err) {
            console.log(err)
        }
    })
});

// Api to retrieve action by user ID
router.get('/position/:user_position', function (req, res, next) {
    Actions.getActionByUserPosition(req.query.user_position).then(result => {
        try {
            return res.json(result);
        } catch (err) {
            console.log(err)
        }
    })
});

// Api to retrieve action by user ID
router.get('/validation/:status', function (req, res, next) {
    Actions.getActionByStatus(req.query.status).then(result => {
        try {
            return res.json(result);
        } catch (err) {
            console.log(err)
        }
    })
});

// Api to validate VM action by ID
router.post('/VMvalidated', function (req, res, next) {
    Actions.validateVMActionById(req.query.action_id, req.query.user_email).then((result, error) => {
        Actions.getActionById(req.query.action_id).then((action, error) => {
            if (result) {
                var smtpTrans = nodemailer.createTransport({
                    service: 'Gmail',
                    auth: {
                        user: 'yknaizia@gmail.com',
                        pass: 'yass94683607'
                    }
                });
                var mailOptions = {
                    to: req.query.action_sender,
                    from: req.query.user_email,
                    subject: "Validation d'action",
                    text: `Votre action a été validée de la part du ${req.query.user_email} avec success! et en attente de validation DSM! \nDescription détaillée sur l'action portante ID: ${action.action_id} sous username: ${req.query.user_email.split("@").shift()} \n- Produit: ${action.product} \n- Orateur: ${action.speaker} \n- Proposition d'orateur: ${action.speaker_suggestion} \n- Type d’action: ${action.action_type} \n- Transfert: ${action.speaker_transfer} \n- Hébergement: ${action.speaker_accommodation} \n- Autre staff sanofi: ${action.other_staff} \n- Agenda de la réunion: ${action.meeting_agenda} \n- Date début de l’action: ${action.start_action} \n- Date fin de l’action: ${action.end_action} \n- Théme de la réunion: ${action.meeting_theme} \n- Nombre de Pax: ${action.pax_number} \n- Horaire: ${action.schedule} \n- Liste Médecins invités: ${action.invited_doctors} \n- Ville: ${action.action_town} \n- Lieu: ${action.action_location} \n- Autre lieu: ${action.other_location} \n- Autres médecins: ${action.other_doctors} \n- Commentaires: ${action.comments}`,
                };
                smtpTrans.sendMail(mailOptions, function (err, info) {
                    if (err) {
                        console.log(err)
                    } else {
                        req.flash('success', 'An e-mail has been sent to ' + req.query.user_email + ' with further instructions.');
                        res.redirect('/forgot');
                    }
                });
                return res.json(result);
            } else {
                console.log("error", error)
            }
        })
    })
});

// Api to validate DSM action by ID
router.post('/DSMvalidated', function (req, res, next) {
    Actions.validateDSMActionById(req.query.action_id, req.query.user_email).then((result, error) => {
        Actions.getActionById(req.query.action_id).then((action, error) => {
            if (result) {
                var smtpTrans = nodemailer.createTransport({
                    service: 'Gmail',
                    auth: {
                        user: 'yknaizia@gmail.com',
                        pass: 'yass94683607'
                    }
                });
                var mailOptions = {
                    to: req.query.action_sender,
                    from: req.query.user_email,
                    subject: "Validation d'action",
                    text: `Votre action a été validée de la part du ${req.query.user_email} avec success! et en attente de validation CDP! \nDescription détaillée sur l'action portante ID: ${action.action_id} sous username: ${req.query.user_email.split("@").shift()} \n- Produit: ${action.product} \n- Orateur: ${action.speaker} \n- Proposition d'orateur: ${action.speaker_suggestion} \n- Type d’action: ${action.action_type} \n- Transfert: ${action.speaker_transfer} \n- Hébergement: ${action.speaker_accommodation} \n- Autre staff sanofi: ${action.other_staff} \n- Agenda de la réunion: ${action.meeting_agenda} \n- Date début de l’action: ${action.start_action} \n- Date fin de l’action: ${action.end_action} \n- Théme de la réunion: ${action.meeting_theme} \n- Nombre de Pax: ${action.pax_number} \n- Horaire: ${action.schedule} \n- Liste Médecins invités: ${action.invited_doctors} \n- Ville: ${action.action_town} \n- Lieu: ${action.action_location} \n- Autre lieu: ${action.other_location} \n- Autres médecins: ${action.other_doctors} \n- Commentaires: ${action.comments}`,
                };
                smtpTrans.sendMail(mailOptions, function (err, info) {
                    if (err) {
                        console.log(err)
                    } else {
                        req.flash('success', 'An e-mail has been sent to ' + req.query.action_sender + ' with further instructions.');
                        res.redirect('/forgot');
                    }
                });
                return res.json(result);
            } else {
                console.log("error", error)
            }
        })
    })
});


// Api to validate CDP action by ID
router.post('/CDPvalidated', function (req, res, next) {
    Actions.validateCDPActionById(req.query.action_id, req.query.user_email).then((result, error) => {
        Actions.getActionById(req.query.action_id).then((action, error) => {
            if (result) {
                var smtpTrans = nodemailer.createTransport({
                    service: 'Gmail',
                    auth: {
                        user: 'yknaizia@gmail.com',
                        pass: 'yass94683607'
                    }
                });
                var mailOptions = {
                    to: req.query.action_sender,
                    from: req.query.user_email,
                    subject: "Validation d'action",
                    text: `Votre action a été validée avec success de la part du ${req.query.user_email} \nDescription détaillée sur l'action portante ID: ${action.action_id} sous username: ${req.query.user_email.split("@").shift()} \n- Produit: ${action.product} \n- Orateur: ${action.speaker} \n- Proposition d'orateur: ${action.speaker_suggestion} \n- Type d’action: ${action.action_type} \n- Transfert: ${action.speaker_transfer} \n- Hébergement: ${action.speaker_accommodation} \n- Autre staff sanofi: ${action.other_staff} \n- Agenda de la réunion: ${action.meeting_agenda} \n- Date début de l’action: ${action.start_action} \n- Date fin de l’action: ${action.end_action} \n- Théme de la réunion: ${action.meeting_theme} \n- Nombre de Pax: ${action.pax_number} \n- Horaire: ${action.schedule} \n- Liste Médecins invités: ${action.invited_doctors} \n- Ville: ${action.action_town} \n- Lieu: ${action.action_location} \n- Autre lieu: ${action.other_location} \n- Autres médecins: ${action.other_doctors} \n- Commentaires: ${action.comments}`,
                };
                smtpTrans.sendMail(mailOptions, function (err, info) {
                    if (err) {
                        console.log(err)
                    } else {
                        req.flash('success', 'An e-mail has been sent to ' + req.query.user_email + ' with further instructions.');
                        res.redirect('/forgot');
                    }
                });
                return res.json(result);
            } else {
                console.log("error", error)
            }
        })
    })
});

// Api to validate action by ID
router.post('/denied', function (req, res, next) {
    Actions.denyActionById(req.query.action_id).then((result, error) => {
        if (result) {
            return res.json(result);
        } else {
            console.log("error", error)
        }
    })
});


module.exports = router;