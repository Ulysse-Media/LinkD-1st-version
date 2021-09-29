const express = require('express');
const router = express.Router();
const Actions = require("../database-mysql/actions/actions");
const Users = require("../database-mysql/users/users");
const nodemailer = require('nodemailer');
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

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

// Api to retrieve action by status 
router.get('/validation/DSMvalidated/speaker', function (req, res, next) {
    Actions.getSpeakerActions().then(result => {
        try {
            return res.json(result);
        } catch (err) {
            console.log(err)
        }
    })
});

// Api to retrieve VM actions by user id 
router.get('/VM/actions/:user_id', function (req, res, next) {
    Actions.getDSMActions(req.query.user_id).then(result => {
        try {
            return res.json(result);
        } catch (err) {
            console.log(err)
        }
    })
});

// Api to retrieve VM validated actions by user id 
router.get('/VM/validated/actions/:user_id', function (req, res, next) {
    Actions.getCDPActions(req.query.user_id).then(result => {
        try {
            return res.json(result);
        } catch (err) {
            console.log(err)
        }
    })
});

// Api to retrieve DSM validated action by user ID 
router.get('/validation/DSMvalidated/:user_id', function (req, res, next) {
    Actions.getDSMValidatedActions(req.query.user_id).then(result => {
        try {
            return res.json(result);
        } catch (err) {
            console.log(err)
        }
    })
});

// Api to retrieve CDP validated action by user ID 
router.get('/validation/CDPvalidated/pending/:user_id', function (req, res, next) {
    Actions.getPendingCDPValidatedActions(req.query.user_id).then(result => {
        try {
            return res.json(result);
        } catch (err) {
            console.log(err)
        }
    })
});

// Api to retrieve CDP validated action by user ID 
router.get('/validation/CDPvalidated/:user_id', function (req, res, next) {
    Actions.getCDPValidatedActions(req.query.user_id).then(result => {
        try {
            return res.json(result);
        } catch (err) {
            console.log(err)
        }
    })
});

// Api to retrieve DSM rejected action by user ID 
router.get('/rejection/DSMrejected/:user_id', function (req, res, next) {
    Actions.getDSMRejectedActions(req.query.user_id).then(result => {
        try {
            return res.json(result);
        } catch (err) {
            console.log(err)
        }
    })
});

// Api to retrieve CDP rejected action by user ID 
router.get('/rejection/CDPrejected/:user_id', function (req, res, next) {
    Actions.getCDPRejectedActions(req.query.user_id).then(result => {
        try {
            return res.json(result);
        } catch (err) {
            console.log(err)
        }
    })
});

// Api to validate VM action by ID
router.post('/VMvalidated', function (req, res, next) {
    Actions.validateVMActionById(req.query.action_id, req.query.user_email, req.query.user_id).then((result, error) => {
        Actions.getActionById(req.query.action_id).then((action, error) => {
            Users.getClient(req.query.DSM_supervisor).then(DSMResult => {
                Users.getClient(req.query.CDP_supervisor).then(CDPResult => {
                    let DSM_email = DSMResult[0].user_email;
                    let CDP_email = CDPResult[0].user_email;
                    if (result) {
                        var smtpTrans = nodemailer.createTransport({
                            service: 'Gmail',
                            auth: {
                                user: 'yknaizia@gmail.com',
                                pass: 'yassine94683607'
                            }
                        });
                        var mailOptions = {
                            to: [req.query.action_sender, DSM_email, CDP_email],
                            from: 'yknaizia@gmail.com',
                            subject: "Validation d'action",
                            text: `Votre action a été envoyée de la part du ${req.query.user_email} et en attente de validation DSM! \nDescription détaillée sur l'action portante ID: ${action.action_id} sous username: ${req.query.user_email.split("@").shift()} \n- Produit: ${action.product} \n- Orateur: ${action.speaker} \n- Proposition d'orateur: ${action.speaker_suggestion} \n- Type d’action: ${action.action_type} \n- Transfert: ${action.speaker_transfer} \n- Hébergement: ${action.speaker_accommodation} \n- Autre staff sanofi: ${action.other_staff} \n- Agenda de la réunion: ${action.meeting_agenda} \n- Date début de l’action: ${action.start_action} \n- Date fin de l’action: ${action.end_action} \n- Théme de la réunion: ${action.meeting_theme} \n- Nombre de Pax: ${action.pax_number} \n- Horaire: ${action.schedule} \n- Liste Médecins invités: ${action.invited_doctors} \n- Ville: ${action.action_town} \n- Lieu: ${action.action_location} \n- Autre lieu: ${action.other_location} \n- Autres médecins: ${action.other_doctors} \n- Commentaires: ${action.comments}`,
                        };
                        smtpTrans.sendMail(mailOptions, function (err, info) {
                            if (err) {
                                console.log(err)
                            } else {
                                req.flash('success', 'An e-mail has been sent to ' + req.query.user_email + ' with further instructions.');
                                res.redirect('/monitoring-action');
                            }
                        });
                        return res.json(result);
                    } else {
                        console.log("error", error)
                    }
                })
            })
        })
    })
});

// Api to validate DSM action by ID
router.post('/DSMvalidated', function (req, res, next) {
    Actions.validateDSMActionById(req.query.action_id, req.query.user_email, req.query.user_id).then((result, error) => {
        Actions.getActionById(req.query.action_id).then((action, error) => {
            if (result) {
                var smtpTrans = nodemailer.createTransport({
                    service: 'Gmail',
                    auth: {
                        user: 'yknaizia@gmail.com',
                        pass: 'yassine94683607'
                    }
                });
                var mailOptions = {
                    to: [req.query.action_sender, req.query.user_email],
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

// Api to validate DSM with speaker action by ID
router.post('/DSMSpeakervalidated', function (req, res, next) {
    Actions.validateDSMSpeakerActionById(req.query.action_id, req.query.user_email, req.query.user_id).then((result, error) => {
        Actions.getActionById(req.query.action_id).then((action, error) => {
            if (result) {
                var smtpTrans = nodemailer.createTransport({
                    service: 'Gmail',
                    auth: {
                        user: 'yknaizia@gmail.com',
                        pass: 'yassine94683607'
                    }
                });
                var mailOptions = {
                    to: [req.query.action_sender, req.query.user_email],
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
router.post('/CDPvalidated/first', function (req, res, next) {
    console.log(req.query)
    Actions.validateFirstCDPActionById(req.query.action_id, req.query.user_email, req.query.user_id).then((result, error) => {
        Actions.getActionById(req.query.action_id).then((action, error) => {
            if (result) {
                var smtpTrans = nodemailer.createTransport({
                    service: 'Gmail',
                    auth: {
                        user: 'yknaizia@gmail.com',
                        pass: 'yassine94683607'
                    }
                });
                var mailOptions = {
                    to: [req.query.action_sender, req.query.user_email],
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
// Api to validate CDP action by ID
router.post('/CDPvalidated', function (req, res, next) {
    Actions.validateCDPActionById(req.query.action_id, req.query.user_email, req.query.user_id).then((result, error) => {
        Actions.getActionById(req.query.action_id).then((action, error) => {
            if (result) {
                var smtpTrans = nodemailer.createTransport({
                    service: 'Gmail',
                    auth: {
                        user: 'yknaizia@gmail.com',
                        pass: 'yassine94683607'
                    }
                });
                var mailOptions = {
                    to: [req.query.action_sender, req.query.user_email],
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

// Api to validate MED action by ID
router.post('/MEDvalidated/first', function (req, res, next) {
    console.log(req.query)
    Actions.validateFirstMEDActionById(req.query.action_id, req.query.user_email, req.query.user_id).then((result, error) => {
        Actions.getActionById(req.query.action_id).then((action, error) => {
            if (result) {
                var smtpTrans = nodemailer.createTransport({
                    service: 'Gmail',
                    auth: {
                        user: 'yknaizia@gmail.com',
                        pass: 'yassine94683607'
                    }
                });
                var mailOptions = {
                    to: [req.query.action_sender, req.query.user_email],
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

// Api to validate MED action by ID
router.post('/MEDvalidated', function (req, res, next) {
    Actions.validateMEDActionById(req.query.action_id, req.query.user_email, req.query.user_id).then((result, error) => {
        Actions.getActionById(req.query.action_id).then((action, error) => {
            if (result) {
                var smtpTrans = nodemailer.createTransport({
                    service: 'Gmail',
                    auth: {
                        user: 'yknaizia@gmail.com',
                        pass: 'yassine94683607'
                    }
                });
                var mailOptions = {
                    to: [req.query.action_sender, req.query.user_email],
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

// Api to reject DSM action by ID
router.post('/DSMdenied', function (req, res, next) {
    Actions.denyDSMActionById(req.query.action_id, req.query.user_id).then((result, error) => {
        if (result) {
            return res.json(result);
        } else {
            console.log("error", error)
        }
    })
});

// Api to reject CDP action by ID
router.post('/CDPdenied', function (req, res, next) {
    Actions.denyCDPActionById(req.query.action_id, req.query.user_id).then((result, error) => {
        if (result) {
            return res.json(result);
        } else {
            console.log("error", error)
        }
    })
});

// Api to reject CDP action by ID
router.post('/returned/:action_id', function (req, res, next) {
    Actions.returnActionById(req.query.action_id).then((result, error) => {
        if (result) {
            return res.json(result);
        } else {
            console.log("error", error)
        }
    })
});

// Api to disarchive action by ID
router.post('/disarchived/:action_id', function (req, res, next) {
    Actions.disarchiveActionById(req.query.action_id).then((result, error) => {
        if (result) {
            return res.json(result);
        } else {
            console.log("error", error)
        }
    })
});

// Api to archive action by ID
router.post('/archived/:action_id', function (req, res, next) {
    Actions.archiveActionById(req.query.action_id, req.body.present_doctors).then((result, error) => {
        if (result) {
            return res.json(result);
        } else {
            console.log("error", error)
        }
    })
});

// Api to archive action by ID
router.post('/finished/:action_id', function (req, res, next) {
    Actions.finishActionById(req.query.action_id).then((result, error) => {
        if (result) {
            return res.json(result);
        } else {
            console.log("error", error)
        }
    })
});

router.post('/twilio/messaging/validation', function (req, res, nest) {
    client.messages
        .create({
            body: 'Action validée avec success',
            from: process.env.MY_OLD_PHONE_NUMBER,
            to: req.body.to
        }).then(message => {
            res.json(message);
        }).catch(err => {
            console.log(err);
            res.json({ success: false });
        });
})

router.post('/twilio/messaging/rejection', function (req, res, nest) {
    client.messages
        .create({
            body: 'Action rejetée',
            from: process.env.MY_OLD_PHONE_NUMBER,
            to: req.body.to
        }).then(message => {
            res.json(message);
        }).catch(err => {
            console.log(err);
            res.json({ success: false });
        });
})

// Api to send agence services 
router.post('/CDPvalidated/services', function (req, res, next) {
    let agency_name = [];
    let agency_email = [];
    for(var i = 0 ; i < req.body.values.agency.length ; i++) {
        agency_name.push(req.body.values.agency[i].split(",")[1])
        agency_email.push(req.body.values.agency[i].split(",")[0])
    }
    var smtpTrans = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'yknaizia@gmail.com',
            pass: 'yassine94683607'
        }
    });
    var mailOptions = {
        to: [agency_email],
        from: 'yknaizia@gmail.com',
        subject: "Choix de service",
        text: `Bonjour, Merci de nous confirmer l’action suivante
        - Type de l’action: ${req.body.action.action_type}
        - Nombre des participants: ${req.body.action.pax_number}
        - Lieu de l’action : ${req.body.action.action_location}
        - Date de l’action: ${req.body.action.start_action.split("T")[0]}
        - Horaire: ${req.body.action.schedule}
        - Service demandé : ${req.body.values.service_name}
        Service additionnel : 
        Commentaires: 
        - Nom de facturation (Sanofi-Aventis Tunisie; Winthrop Pharma Tunisie) : Sanofi-Aventis Tunisie
        - Contact responsable action: ${req.body.action.user_email}
        Cordialement.
        `,
    };
    smtpTrans.sendMail(mailOptions, function (err, info) {
        if (err) {
            console.log(err)
        } else {
            req.flash('success', 'An e-mail has been sent to ' + req.query.agency_email + ' with further instructions.');
            res.redirect('/monitoring-action');
        }
    });
    return res.json({result : "Email sent to agency successfully"});

});

module.exports = router;