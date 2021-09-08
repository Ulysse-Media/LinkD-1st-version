import React, { useEffect, useState } from "react";
import PageTitle from "../components/common/PageTitle";
import { Row, Col } from "shards-react";
import { useDispatch, useSelector } from "react-redux";
import { getActionById, denyDSMActionById, denyCDPActionById, validateDSMActionById, modifyActionById, validateVMActionById, validateDSMSpeakerActionById, validateCDPActionById, validateCDPFirstActionById, removeActionById, returnActionById, validateMEDActionById, validateMEDFirstActionById, messagingValidation, messagingRejection, archiveActionById } from "../actions/actions-initiation-actions/actions";
import { pushNotification } from "../actions/notifications-actions/actions";
import InvitedDoctorsSpeciality from "../components/recap-statistics/DoctorsSpeciality";
import InvitedDoctorsFeedback from "../components/recap-statistics/DoctorsFeedback";
import {
  Typography,
  Paper,
  Grid,
  Avatar,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useMediaQuery,
} from '@material-ui/core';
import { useHistory } from "react-router-dom";
import { useTheme } from '@material-ui/core/styles';
import { toast } from 'react-toastify';
toast.configure();

const DisplayAction = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [open, setOpen] = React.useState(false);
  const [NoteContent, setNoteContent] = React.useState("");
  const [LastAction, setLastAction] = useState({});
  const [Speaker, setSpeaker] = useState("");
  const [SpeakerTransfer, setSpeakerTransfer] = useState("");
  const [SpeakerAccommodation, setSpeakerAccommodation] = useState("");
  const [StartAction, setStartAction] = useState("");
  const [EndAction, setEndAction] = useState("");
  const history = useHistory();
  var pathId = history.location.pathname.split("/")[history.location.pathname.split("/").length - 1];

  // User state from redux store
  const user = useSelector(
    (state) => state.authReducer.user[0]
  );
  // Action state from redux store
  const action = useSelector(
    (state) => state.actionsReducer.action
  );

  // All displayed fields form //
  const formFields = [
    {
      size: 3,
      field: (
        <Typography className={"typography"} style={{ marginTop: "18px" }}>
          Demandeur :
        </Typography>
      ),
    },
    {
      size: 3,
      field: (
        <Typography className={"typography"} style={{ marginTop: "18px" }}>
          {action.user_email && (action.user_email).split("@").shift()}
        </Typography>
      ),
    },
    {
      size: 3,
      field: (
        <Typography className={"typography"} style={{ marginTop: "18px" }}>
          Produit :
        </Typography>
      ),
    },
    {
      size: 3,
      field: (
        <Typography className={"typography"} style={{ marginTop: "18px" }}>
          {LastAction.product}
        </Typography>
      ),
    },
    {
      size: 3,
      field: (
        <Typography className={"typography"} style={{ marginTop: "18px" }}>
          Contact :
        </Typography>
      ),
    },
    {
      size: 3,
      field: (
        <Typography className={"typography"} style={{ marginTop: "18px" }}>
          {action.user_email}
        </Typography>
      ),
    },
    {
      size: 3,
      field: (
        <Typography className={"typography"} style={{ marginTop: "18px" }}>
          Orateur :
        </Typography>
      ),
    },
    {
      size: 3,
      field: (
        <Typography className={"typography"} style={{ marginTop: "18px" }}>
          {Speaker}
        </Typography>
      ),
    },
    {
      size: 3,
      field: (
        <Typography className={"typography"} style={{ marginTop: "18px" }}>
          Supérieur hiérarchique :
        </Typography>
      ),
    },
    {
      size: 3,
      field: (
        <Typography className={"typography"} style={{ marginTop: "18px" }}>
          {user.user_position === "VM" ? user.DSM_supervisor : user.user_position === "DSM" ? user.CDP_supervisor : null}
        </Typography>
      ),
    },
    {
      size: 3,
      field: (
        <Typography className={"typography"} style={{ marginTop: "18px" }}>
          Proposition d'orateur :
        </Typography>
      ),
    },
    {
      size: 3,
      field: (
        <Typography className={"typography"} style={{ marginTop: "18px" }}>
          {LastAction.speaker_suggestion}
        </Typography>
      ),
    },
    {
      size: 3,
      field: (
        <Typography className={"typography"} style={{ marginTop: "18px" }}>
          Type d’action :
        </Typography>
      ),
    },
    {
      size: 3,
      field: (
        <Typography className={"typography"} style={{ marginTop: "18px" }}>
          {LastAction.action_type}
        </Typography>
      ),
    },
    {
      size: 3,
      field: (
        <Typography className={"typography"} style={{ marginTop: "18px" }}>
          Transfert :
        </Typography>
      ),
    },
    {
      size: 3,
      field: (
        <Typography className={"typography"} style={{ marginTop: "18px" }}>
          {SpeakerTransfer}
        </Typography>
      ),
    },
    {
      size: 3,
      field: (
        <Typography className={"typography"} style={{ marginTop: "18px" }}>
          Hébergement :
        </Typography>
      ),
    },
    {
      size: 3,
      field: (
        <Typography className={"typography"} style={{ marginTop: "18px" }}>
          {SpeakerAccommodation}
        </Typography>
      ),
    },
    {
      size: 3,
      field: (
        <Typography className={"typography"} style={{ marginTop: "18px" }}>
          Autre staff sanofi :
        </Typography>
      ),
    },
    {
      size: 3,
      field: (
        <Typography className={"typography"} style={{ marginTop: "18px" }}>
          {action.other_stuff}
        </Typography>
      ),
    },
    {
      size: 3,
      field: (
        <Typography className={"typography"} style={{ marginTop: "18px" }}>
          Agenda de la réunion :
        </Typography>
      ),
    },
    {
      size: 3,
      field: (
        <Typography className={"typography"} style={{ marginTop: "18px" }}>
          <Avatar alt="uploaded-file" className="file" src={LastAction.meeting_agenda} />
        </Typography>
      ),
    },
    {
      size: 3,
      field: (
        <Typography className={"typography"} style={{ marginTop: "18px" }}>
          Date début de l’action :
        </Typography>
      ),
    },
    {
      size: 3,
      field: (
        <Typography className={"typography"} style={{ marginTop: "18px" }}>
          {StartAction}
        </Typography>
      ),
    },
    {
      size: 3,
      field: (
        <Typography className={"typography"} style={{ marginTop: "18px" }}>
          Théme de la réunion :
        </Typography>
      ),
    },
    {
      size: 3,
      field: (
        <Typography className={"typography"} style={{ marginTop: "18px" }}>
          {LastAction.meeting_theme}
        </Typography>
      ),
    },
    {
      size: 3,
      field: (
        <Typography className={"typography"} style={{ marginTop: "18px" }}>
          Date fin de l’action :
        </Typography>
      ),
    },
    {
      size: 3,
      field: (
        <Typography className={"typography"} style={{ marginTop: "18px" }}>
          {EndAction}
        </Typography>
      ),
    },
    {
      size: 3,
      field: (
        <Typography className={"typography"} style={{ marginTop: "18px" }}>
          Nombre de Pax :
        </Typography>
      ),
    },
    {
      size: 3,
      field: (
        <Typography className={"typography"} style={{ marginTop: "18px" }}>
          {LastAction.pax_number}
        </Typography>
      ),
    },
    {
      size: 3,
      field: (
        <Typography className={"typography"} style={{ marginTop: "18px" }}>
          Horaire :
        </Typography>
      ),
    },
    {
      size: 3,
      field: (
        <Typography className={"typography"} style={{ marginTop: "18px" }}>
          {LastAction.schedule}
        </Typography>
      ),
    },
    {
      size: 3,
      field: (
        <Typography className={"typography"} style={{ marginTop: "18px" }}>
          Liste Médecins invités :
        </Typography>
      ),
    },
    {
      size: 3,
      field: (
        <Typography className={"typography"} style={{ marginTop: "18px" }}>
          {LastAction.invited_doctors}
        </Typography>
      ),
    },
    {
      size: 3,
      field: (
        <Typography className={"typography"} style={{ marginTop: "18px" }}>
          Ville :
        </Typography>
      ),
    },
    {
      size: 3,
      field: (
        <Typography className={"typography"} style={{ marginTop: "18px" }}>
          {LastAction.action_town}
        </Typography>
      ),
    },
    {
      size: 3,
      field: (
        <Typography className={"typography"} style={{ marginTop: "18px" }}>
          Autres médecins :
        </Typography>
      ),
    },
    {
      size: 3,
      field: (
        <Typography className={"typography"} style={{ marginTop: "18px" }}>
          {LastAction.other_doctors}
        </Typography>
      ),
    },
    {
      size: 3,
      field: (
        <Typography className={"typography"} style={{ marginTop: "18px" }}>
          Lieu :
        </Typography>
      ),
    },
    {
      size: 3,
      field: (
        <Typography className={"typography"} style={{ marginTop: "18px" }}>
          {LastAction.action_location}
        </Typography>
      ),
    },
    {
      size: 3,
      field: (
        <Typography className={"typography"} style={{ marginTop: "18px" }}>
          Commentaires :
        </Typography>
      ),
    },
    {
      size: 3,
      field: (
        <Typography className={"typography"} style={{ marginTop: "18px" }}>
          {LastAction.comments}
        </Typography>
      ),
    },
    {
      size: 3,
      field: (
        <Typography className={"typography"} style={{ marginTop: "18px" }}>
          Autre lieu :
        </Typography>
      ),
    },
    {
      size: 3,
      field: (
        <Typography className={"typography"} style={{ marginTop: "18px" }}>
          {LastAction.other_location}
        </Typography>
      ),
    },
  ];

  const handleDialogOpen = () => {
    setOpen(true);
  };

  const handleDialoClose = () => {
    setOpen(false);
  };
  const handleModifyActionById = () => {
    history.push("/initiation-action")
  }

  const handleEdit = () => {
    let values = {};
    let returnedDSMText = `Action avec id ${pathId} de la part du client ${action.user_email} a été en retour avec modification de la part du DSM ${user.user_email} pour la raison ${NoteContent}`
    let returnedCDPText = `Action avec id ${pathId} de la part du client ${action.user_email} a été en retour avec modification de la part du CDP ${user.user_email} pour la raison ${NoteContent}`
    let returnedMEDText = `Action avec id ${pathId} de la part du client ${action.user_email} a été en retour avec modification de la part du MED ${user.user_email} pour la raison ${NoteContent}`
    values.notification_sender = user.user_id;
    values.DSM_supervisor = user.DSM_supervisor;
    values.CDP_supervisor = user.CDP_supervisor;
    values.recieved_since = new Date();
    if (user.user_position === "VM") {
      values.VM_supervisor = action.VM_validation;
      values.notification_name = returnedDSMText;
      dispatch(pushNotification(values));
      dispatch(modifyActionById(action.action_id));
    }
    if (user.user_position === "DSM") {
      values.VM_supervisor = action.VM_validation;
      values.notification_name = returnedDSMText;
      dispatch(pushNotification(values));
      dispatch(returnActionById(action.action_id));
    }
    if (user.user_position === "CDP") {
      values.VM_supervisor = action.VM_validation;
      values.notification_name = returnedCDPText;
      dispatch(pushNotification(values));
      dispatch(returnActionById(action.action_id));
    }
    if (user.user_position === "MED") {
      values.VM_supervisor = action.VM_validation;
      values.notification_name = returnedMEDText;
      dispatch(pushNotification(values));
      dispatch(returnActionById(action.action_id));
    }
  };

  const handleValidate = () => {
    let values = {};
    let validationVMText = `Action avec id ${pathId} de la part du client ${action.user_email} a été envoyée et en attente de validation DSM!`
    let validationDSMText = `Action avec id ${pathId} de la part du client ${action.user_email} a été validée avec succés de la part du DSM ${user.user_email} et en attente de validation CDP`
    let validationCDPText = `Action avec id ${pathId} de la part du client ${action.user_email} a été validée avec succés de la part du chef de projet ${user.user_email}!`
    values.notification_sender = user.user_id;
    values.recieved_since = new Date();
    if (user.user_position === "VM") {
      if (action.status === "En attente de validation VM") {
        values.DSM_supervisor = user.DSM_supervisor;
        values.CDP_supervisor = user.CDP_supervisor;
        values.VM_supervisor = user.user_id;
        values.notification_name = validationVMText;
        dispatch(validateVMActionById(pathId, user.user_email, user.user_id, action.user_email, user.DSM_supervisor, user.CDP_supervisor));
        dispatch(pushNotification(values));
        dispatch(messagingValidation(parseInt(user.user_phone_number)));
      } else if(action.status === "Terminée et non archivée") {
        dispatch(archiveActionById(action.action_id));
      }
       else {
        history.push("/after-validation")
      }
    } else if (user.user_position === "DSM") {
      values.VM_supervisor = action.VM_validation;
      values.DSM_supervisor = user.user_id;
      values.CDP_supervisor = user.CDP_supervisor;
      values.notification_name = validationDSMText;
      if (action.speaker === 0) {
        dispatch(validateDSMActionById(pathId, user.user_email, user.CDP_supervisor, action.user_email));
        dispatch(pushNotification(values));
        dispatch(messagingValidation(+21694683607));
      } else {
        dispatch(validateDSMSpeakerActionById(pathId, user.user_email, user.CDP_supervisor, action.user_email));
        dispatch(pushNotification(values));
        dispatch(messagingValidation(+21694683607));
      }
    } else if (user.user_position === "CDP") {
      values.VM_supervisor = action.VM_validation;
      values.DSM_supervisor = user.DSM_supervisor;
      values.CDP_supervisor = user.user_id;
      values.notification_name = validationCDPText;
      if (action.status === 'En attente de validation CDP et MED') {
        dispatch(validateCDPFirstActionById(pathId, user.user_email, user.user_id, action.user_email));
        dispatch(pushNotification(values));
        dispatch(messagingValidation(parseInt(user.user_phone_number)));
      } else {
        dispatch(validateCDPActionById(pathId, user.user_email, user.user_id, action.user_email));
        dispatch(pushNotification(values));
        dispatch(messagingValidation(+21694683607));
      }
    } else if (user.user_position === "MED") {
      values.VM_supervisor = action.VM_validation;
      values.DSM_supervisor = user.DSM_supervisor;
      values.CDP_supervisor = user.user_id;
      values.notification_name = validationCDPText;
      if (action.status === 'En attente de validation CDP et MED') {
        dispatch(validateMEDFirstActionById(pathId, user.user_email, user.user_id, action.user_email));
        dispatch(pushNotification(values));
        dispatch(messagingValidation(parseInt(user.user_phone_number)));
      } else {
        dispatch(validateMEDActionById(pathId, user.user_email, user.user_id, action.user_email));
        dispatch(pushNotification(values));
        dispatch(messagingValidation(parseInt(user.user_phone_number)));
      }
    }
  }

  const handleDelete = () => {
    let values = {};
    let rejectionVMText = `Action avec id ${pathId} du client ${action.user_email} a été supprimée avec succés!`
    let rejectionDSMText = `Action avec id ${pathId} du client ${action.user_email} a été rejetée de la part du DSM ${user.user_email}`
    let rejectionCDPText = `Action avec id ${pathId} du client ${action.user_email} a été rejetée de la part du chef de projet ${user.user_email}!`
    values.notification_sender = user.user_id;
    values.DSM_supervisor = user.DSM_supervisor;
    values.CDP_supervisor = user.CDP_supervisor;
    values.recieved_since = new Date();
    if (user.user_position === "VM") {
      if (action.status === "En attente de validation VM") {
        values.VM_supervisor = user.user_id;
        values.notification_name = rejectionVMText;
        dispatch(removeActionById(pathId));
        dispatch(pushNotification(values));
        dispatch(messagingRejection(user.user_phone_number));
      } else {
        history.goBack()
      }
    } else if (user.user_position === "DSM") {
      values.VM_supervisor = action.VM_validation;
      values.notification_name = rejectionDSMText;
      dispatch(denyDSMActionById(pathId, user.user_id));
      dispatch(pushNotification(values));
      dispatch(messagingRejection(user.user_phone_number));
    } else if (user.user_position === "CDP") {
      values.VM_supervisor = action.VM_validation;
      values.notification_name = rejectionCDPText;
      dispatch(denyCDPActionById(pathId, user.user_id));
      dispatch(pushNotification(values));
      dispatch(messagingRejection(user.user_phone_number));
    } else if (user.user_position === "MED") {
      values.VM_supervisor = action.VM_validation;
      values.notification_name = rejectionCDPText;
      dispatch(denyCDPActionById(pathId, user.user_id));
      dispatch(pushNotification(values));
      dispatch(messagingRejection(user.user_phone_number));
    }
  }

  // Component on mount //
  useEffect(() => {
    dispatch(getActionById(pathId)); // Dispatch get action of all action 
  }, [dispatch, pathId])
  useEffect(() => {
    let startDate = new Date(LastAction.start_action); // Create an instance of start date
    let endDate = new Date(LastAction.end_action); // Create an instance of end date
    if (action) {
      setLastAction(action); // Hook last action to local state
      if (action.start_action) {
        setStartAction(startDate.toLocaleDateString("fr")); // Format date type to French local date string
      }
      if (action.end_action) {
        setEndAction(endDate.toLocaleDateString("fr")); // Format date type to French local date string
      }
      if (action.speaker) {
        setSpeaker("Oui"); // Set logic number `(0/1)` to readable string
      } else {
        setSpeaker("Non"); // Set logic number `(0/1)` to readable string
      }
      if (action.speaker_transfer) {
        setSpeakerTransfer("Oui"); // Set logic number `(0/1)` to readable string
      } else {
        setSpeakerTransfer("Non"); // Set logic number `(0/1)` to readable string
      }
      if (action.speaker_accommodation) {
        setSpeakerAccommodation("Oui"); // Set logic number `(0/1)` to readable string
      } else {
        setSpeakerAccommodation("Non"); // Set logic number `(0/1)` to readable string
      }
    }
  }, [LastAction.start_action, LastAction.end_action, action]);
  return (
    <div style={{ padding: 16, margin: 'auto', maxWidth: 1225, height: '100%' }}>
      <Row noGutters className="page-header py-4">
        <PageTitle sm="4" title="Initiation d'action" subtitle="Link-D / Actions" />
      </Row>
      <Paper style={{ padding: 16 }}>
        <Grid item xs={12}>
          <Typography variant="h5" component="p">
            Récapitulatif de votre demande d'action
          </Typography>
        </Grid>
        <Grid container alignItems="flex-start" style={{ marginTop: 16 }}>
          <Grid item xs={6} style={{ marginBottom: 16 }}>
            <Typography component="p" className="bold-title">
              Logistique :
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography component="p" className="bold-title">
              Thématique :
            </Typography>
          </Grid>
          {formFields.map((item, index) => (
            <Grid item xs={item.size} key={index}>
              {item.field}
            </Grid>
          ))}
          <Row style={{ margin: '0 auto' }}>
            <Col lg="6" md="9" sm="12" style={{ marginTop: "32px" }}><InvitedDoctorsFeedback invited_doctors={LastAction.invited_doctors} /></Col>
            <Col lg="6" md="9" sm="12" style={{ marginTop: "32px" }}><InvitedDoctorsSpeciality invited_doctors={LastAction.invited_doctors} /></Col>
          </Row>
          <Grid container alignItems="flex-start" style={{ marginTop: 32, textAlign: "center", justifyContent: "center" }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleValidate}
              style={{ marginRight: '25px', display: ((user.user_position === "VM" && action.status === "En attente de validation VM") || (user.user_position === "VM" && action.status === "Terminée et non archivée") || (user.user_position === "VM" && action.status === "Validé") || (user.user_position === "DSM" && action.status === "En attente de validation DSM") || (user.user_position === "CDP" && action.status === "En attente de validation CDP") || (user.user_position === "CDP" && action.status === "En attente de validation CDP et MED") || (user.user_position === "MED" && action.status === "En attente de validation CDP et MED") || (user.user_position === "MED" && action.status === "En attente de validation MED") ? 'block' : 'none') }}
            >
              {user.user_position === "VM" && action.status === "En attente de validation VM" ? "Envoyer" : user.user_position === "VM" && action.status === "Terminée et non archivée" ? "Archiver" : "Valider"}
            </Button>
            <Button
              variant="contained"
              onClick={user.user_position === "VM" ? handleModifyActionById : handleDialogOpen}
              style={{ marginRight: '25px', display: ((user.user_position === "VM" && action.status === "En attente de validation VM") || (user.user_position === "DSM" && action.status === "En attente de validation DSM") || (user.user_position === "CDP" && action.status === "En attente de validation CDP") || (user.user_position === "CDP" && action.status === "En attente de validation CDP et MED") || (user.user_position === "MED" && action.status === "En attente de validation CDP et MED") || (user.user_position === "MED" && action.status === "En attente de validation MED") ? 'block' : 'none') }}
            >
              Modifier
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleDelete}
              style={{ marginRight: '25px', display: ((user.user_position === "VM" && action.status === "En attente de validation VM") || (user.user_position === "VM" && action.status === "Validé") || (user.user_position === "DSM" && action.status === "En attente de validation DSM") || (user.user_position === "CDP" && action.status === "En attente de validation CDP") || (user.user_position === "CDP" && action.status === "En attente de validation CDP et MED") || (user.user_position === "MED" && action.status === "En attente de validation CDP et MED") || (user.user_position === "MED" && action.status === "En attente de validation MED") ? 'block' : 'none') }}
            >
              {user.user_position === "VM" && action.status === "En attente de validation VM" ? "Supprimer" : user.user_position === "VM" && action.status === "Validé" ? "Retour" : "Refuser"}
            </Button>
          </Grid>
        </Grid>
        <Dialog
          fullScreen={fullScreen}
          open={open}
          onClose={handleDialoClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">{"Raison de modification d'action"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              <TextField
                id="standard-multiline-flexible"
                label="Tapez la raison ici"
                multiline
                rowsMax={4}
                onChange={(e) => setNoteContent(e.target.value)}
              />
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleDialoClose} color="primary">
              Annuler
            </Button>
            <Button onClick={handleEdit} color="primary" autoFocus>
              Enregistrer
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </div>
  )
}

export default DisplayAction;



