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

// Api to validate action by ID
router.post('/validated', function (req, res, next) {
    Actions.validateActionById(req.query.action_id, req.query.user_email).then((result, error) => {
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
                    to: req.query.user_email,
                    from: 'yknaizia@gmail.com',
                    subject: "Validation d'action",
                    text: `Votre action a été validée avec success! \nDescription détaillée sur l'action portante ID: ${action.action_id} sous username: ${req.query.user_email.split("@").shift()} \n- Produit: ${action.product} \n- Orateur: ${action.speaker} \n- Proposition d'orateur: ${action.speaker_suggestion} \n- Type d’action: ${action.action_type} \n- Transfert: ${action.speaker_transfer} \n- Hébergement: ${action.speaker_accommodation} \n- Autre staff sanofi: ${action.other_staff} \n- Agenda de la réunion: ${action.meeting_agenda} \n- Date début de l’action: ${action.start_action} \n- Date fin de l’action: ${action.end_action} \n- Théme de la réunion: ${action.meeting_theme} \n- Nombre de Pax: ${action.pax_number} \n- Horaire: ${action.schedule} \n- Liste Médecins invités: ${action.invited_doctors} \n- Ville: ${action.action_town} \n- Lieu: ${action.action_location} \n- Autre lieu: ${action.other_location} \n- Autres médecins: ${action.other_doctors} \n- Commentaires: ${action.comments}`,
                };
                smtpTrans.sendMail(mailOptions, function (err, info) {
                    if (err) {
                        done(err)
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