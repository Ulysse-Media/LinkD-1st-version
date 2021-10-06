import React, { useEffect, useState } from "react";
import PageTitle from "../components/common/PageTitle";
import { Row, Col } from "shards-react";
import { useDispatch, useSelector } from "react-redux";
import { getActionById, denyDSMActionById, denyCDPActionById, validateDSMActionById, modifyActionById, validateVMActionById, validateDSMSpeakerActionById, validateCDPActionById, validateCDPFirstActionById, removeActionById, returnActionById, validateMEDActionById, validateMEDFirstActionById, messagingValidation, messagingRejection, archiveActionById, downloadFile } from "../actions/actions-initiation-actions/actions";
import { retrieveFile } from "../actions/files-actions/actions";
import { retrieveInvoice } from "../actions/invoices-actions/actions";
import { pushNotification } from "../actions/notifications-actions/actions";
import InvitedDoctorsSpeciality from "../components/recap-statistics/DoctorsSpeciality";
import InvitedDoctorsFeedback from "../components/recap-statistics/DoctorsFeedback";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
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
  const [open, setOpen] = useState(false);
  const [NoteContent, setNoteContent] = useState("");
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
  // Invoice state from redux store
  const invoice = useSelector(
    (state) => state.invoicesReducer.invoice
  );

  // All displayed action fields form //
  const actionFields = [
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
          {LastAction.product && LastAction.product.split(",").map((element, key) => (
            <li>{element}</li>
          ))}
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
          <Avatar alt="uploaded-file" className="file" src={LastAction.meeting_agenda} style={{ width: 150, height: 150 }} />
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
          {LastAction.invited_doctors && LastAction.invited_doctors.split(",").map((element, key) => (
            <li style={{ marginTop: "8px" }} >{element}</li>
          ))}
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
    {
      size: 3,
      field: (
        <Typography className={"typography"} style={{ marginTop: "18px" }}>
        </Typography>
      ),
    },
  ];

  // All displayed invoices fields form //
  const invoiceFields = [
    {
      size: 3,
      field: (
        <Typography className={"typography"} style={{ marginTop: "18px" }}>
          facture d'hébergement :
        </Typography>
      ),
    },
    {
      size: 3,
      field: (
        <Typography className={"typography"} style={{ marginTop: "18px" }}>
          {invoice.invoice_accommodation}
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
          {invoice.invoice_comments}
        </Typography>
      ),
    },
    {
      size: 3,
      field: (
        <Typography className={"typography"} style={{ marginTop: "18px" }}>
          Extras :
        </Typography>
      ),
    },
    {
      size: 3,
      field: (
        <Typography className={"typography"} style={{ marginTop: "18px" }}>
          {invoice.invoice_extras}
        </Typography>
      ),
    },
    {
      size: 3,
      field: (
        <Typography className={"typography"} style={{ marginTop: "18px" }}>
          Orateur honoraire :
        </Typography>
      ),
    },
    {
      size: 3,
      field: (
        <Typography className={"typography"} style={{ marginTop: "18px" }}>
          {invoice.invoice_honorary_speaker}
        </Typography>
      ),
    },
    {
      size: 3,
      field: (
        <Typography className={"typography"} style={{ marginTop: "18px" }}>
          Prix local :
        </Typography>
      ),
    },
    {
      size: 3,
      field: (
        <Typography className={"typography"} style={{ marginTop: "18px" }}>
          {invoice.invoice_local_price}
        </Typography>
      ),
    },
    {
      size: 3,
      field: (
        <Typography className={"typography"} style={{ marginTop: "18px" }}>
          Prix :
        </Typography>
      ),
    },
    {
      size: 3,
      field: (
        <Typography className={"typography"} style={{ marginTop: "18px" }}>
          {invoice.invoice_price}
        </Typography>
      ),
    },
    {
      size: 3,
      field: (
        <Typography className={"typography"} style={{ marginTop: "18px" }}>
          Logistique :
        </Typography>
      ),
    },
    {
      size: 3,
      field: (
        <Typography className={"typography"} style={{ marginTop: "18px" }}>
          {invoice.invoice_logistic}
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
          {invoice.invoice_transfer}
        </Typography>
      ),
    },
  ];

  const handleDialogOpen = () => {
    // Open modal of dialog
    setOpen(true);
  };

  const handleDialoClose = () => {
    // Close modal of dialog
    setOpen(false);
  };
  const handleModifyActionById = () => {
    // Redirect user to modify action initiated by VM
    history.push("/initiation-action")
  }

  const handleEdit = () => {
    let values = {};
    let returnedDSMText = `Action de type ${action.action_type} de la thématique ${action.meeting_theme} de la part du VM ${action.user_email.split("@")[0]} a été en retour avec modification de la part du DSM ${user.user_email.split("@")[0]} pour la raison ${NoteContent}`
    let returnedCDPText = `Action de type ${action.action_type} de la thématique ${action.meeting_theme} de la part du VM ${action.user_email.split("@")[0]} a été en retour avec modification de la part du CDP ${user.user_email.split("@")[0]} pour la raison ${NoteContent}`
    let returnedMEDText = `Action de type ${action.action_type} de la thématique ${action.meeting_theme} de la part du VM ${action.user_email.split("@")[0]} a été en retour avec modification de la part du MED ${user.user_email.split("@")[0]} pour la raison ${NoteContent}`
    values.notification_sender = user.user_id;
    values.DSM_supervisor = user.DSM_supervisor;
    values.CDP_supervisor = user.CDP_supervisor;
    values.recieved_since = new Date();
    if (user.user_position === "VM") { // User type VM
      values.VM_supervisor = action.VM_validation;
      values.notification_name = returnedDSMText;
      dispatch(pushNotification(values));  // Push notification to VM, DSM && CDP || MED
      dispatch(modifyActionById(action.action_id));  // Modify action by VM
    }
    if (user.user_position === "DSM") { // User type DSM
      values.VM_supervisor = action.VM_validation;
      values.notification_name = returnedDSMText;
      dispatch(pushNotification(values)); // Push notification to VM, DSM, CDP || MED
      dispatch(returnActionById(action.action_id)); // Return action to investigation modification 
    }
    if (user.user_position === "CDP") { // User type CDP
      values.VM_supervisor = action.VM_validation;
      values.notification_name = returnedCDPText;
      dispatch(pushNotification(values)); // Push notification to VM, DSM, CDP || MED
      dispatch(returnActionById(action.action_id)); // Return action to investigation modification 
    }
    if (user.user_position === "MED") { // User type MED
      values.VM_supervisor = action.VM_validation;
      values.notification_name = returnedMEDText;
      dispatch(pushNotification(values)); // Push notification to VM, DSM, CDP && MED
      dispatch(returnActionById(action.action_id)); // Return action to investigation modification 
    }
  };

  const handleValidate = () => {
    let values = {};
    let validationVMText = `Action de type ${action.action_type} de la thématique ${action.meeting_theme} de la part du VM ${action.user_email.split("@")[0]} a été envoyée et en attente de validation DSM!`
    let validationDSMText = `Action de type ${action.action_type} de la thématique ${action.meeting_theme} de la part du VM ${action.user_email.split("@")[0]} a été validée avec succés de la part du DSM ${user.user_email.split("@")[0]} et en attente de validation CDP`
    let validationCDPText = `Action de type ${action.action_type} de la thématique ${action.meeting_theme} de la part du VM ${action.user_email} a été validée avec succés de la part du chef de projet ${user.user_email.split("@")[0]}!`
    let validationMEDText = `Action de type ${action.action_type} de la thématique ${action.meeting_theme} de la part du VM ${action.user_email} a été validée avec succés de la part du médicale ${user.user_email.split("@")[0]}!`
    values.notification_sender = user.user_id;
    values.recieved_since = new Date();
    if (user.user_position === "VM") {
      if (action.status === "En attente d'envoie VM") { // User type VM
        values.VM_supervisor = user.user_id;
        values.DSM_supervisor = user.DSM_supervisor;
        values.CDP_supervisor = user.CDP_supervisor;
        values.notification_name = validationVMText;
        dispatch(validateVMActionById(pathId, user.user_email, user.user_id, action.user_email, user.DSM_supervisor, user.CDP_supervisor)); // Validate action by VM
        dispatch(pushNotification(values)); // Push notification to VM, DSM supervisor, CDP supervisor || MED supervisor 
        dispatch(messagingValidation(parseInt(user.user_phone_number), action)); // Send a message to all destinataires
      } else if (action.status === "Terminée et non archivée") {
        dispatch(archiveActionById(action.action_id)); // Archieve action
      } else if (action.status === "Finalisée") {
        const input = document.getElementById('divToPrint');
        html2canvas(input)
          .then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF({
              orientation: 'p',
              unit: 'mm',
              format: 'a2',
              putOnlyUsedFonts: true,
              precision : 2,
            });
            pdf.addImage(imgData, 'JPEG', 10, 10);
            pdf.save("Action-Reporting.pdf");
          });
      }
    } else if (user.user_position === "DSM") { // User type DSM
      values.VM_supervisor = action.VM_validation;
      values.DSM_supervisor = user.user_id;
      values.CDP_supervisor = user.CDP_supervisor;
      values.notification_name = validationDSMText;
      action.CDP_supervisor = user.CDP_supervisor;
      if (action.speaker === 0) {
        dispatch(validateDSMActionById(pathId, user.user_email, user.CDP_supervisor, action.user_email)); // Validate action by DSM
        dispatch(pushNotification(values)); // Push notification to VM, CDP supervisor
        dispatch(messagingValidation(parseInt(user.user_phone_number), action)); // Send a message to all destinataires
      } else if (action.status === "Finalisée") {
        const input = document.getElementById('divToPrint');
        html2canvas(input)
          .then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF({
              orientation: 'p',
              unit: 'mm',
              format: 'a2',
              putOnlyUsedFonts: true,
              precision : 2,
            });
            pdf.addImage(imgData, 'JPEG', 10, 10);
            pdf.save("Action-Reporting.pdf");
          });
      } else {
        dispatch(validateDSMSpeakerActionById(pathId, user.user_email, user.CDP_supervisor, action.user_email));
        dispatch(pushNotification(values)); // Push notification to VM, CDP supervisor && MED supervisor 
        dispatch(messagingValidation(parseInt(user.user_phone_number), action)); // Send a message to all destinataires
      }
    } else if (user.user_position === "CDP") { // User type CDP
      values.VM_supervisor = action.VM_validation;
      values.DSM_supervisor = user.DSM_supervisor;
      values.CDP_supervisor = user.user_id;
      values.notification_name = validationCDPText;
      if (action.status === 'En attente de validation CDP et MED') {
        dispatch(validateCDPFirstActionById(pathId, user.user_email, user.user_id, action.user_email));
        dispatch(pushNotification(values)); // Push notification to VM, CDP supervisor && MED supervisor 
        dispatch(messagingValidation(parseInt(user.user_phone_number), action)); // Send a message to all destinataires
      } else if (action.status === "Finalisée") {
        const input = document.getElementById('divToPrint');
        html2canvas(input)
          .then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF({
              orientation: 'p',
              unit: 'mm',
              format: 'a2',
              putOnlyUsedFonts: true,
              precision : 2,
            });
            pdf.addImage(imgData, 'JPEG', 10, 10);
            pdf.save("Action-Reporting.pdf");
          });
      } else if (action.status === "Validée par CDP et en attente de retour agence") {
        history.push("/after-validation")
      } else if (action.status === "Validée et en attente d'envoie BC") {
        history.push("/invoice-finalization")
      }
      else {
        dispatch(validateCDPActionById(pathId, user.user_email, user.user_id, action.user_email));
        dispatch(pushNotification(values)); // Push notification to VM, CDP supervisor
        dispatch(messagingValidation(parseInt(user.user_phone_number), action)); // Send a message to all destinataires
      }
    } else if (user.user_position === "MED") { // User type MED
      values.VM_supervisor = action.VM_validation;
      values.DSM_supervisor = user.DSM_supervisor;
      values.CDP_supervisor = user.CDP_supervisor;
      values.MED_supervisor = user.user_id;
      values.notification_name = validationMEDText;
      if (action.status === 'En attente de validation CDP et MED') {
        dispatch(validateMEDFirstActionById(pathId, user.user_email, user.user_id, action.user_email));
        dispatch(pushNotification(values)); // Push notification to VM, CDP supervisor && MED supervisor 
        dispatch(messagingValidation(parseInt(user.user_phone_number), action)); // Send a message to all destinataires
      } else if (action.status === "Finalisée") {
        const input = document.getElementById('divToPrint');
        html2canvas(input)
          .then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF({
              orientation: 'p',
              unit: 'mm',
              format: 'a2',
              putOnlyUsedFonts: true,
              precision : 2,
            });
            pdf.addImage(imgData, 'JPEG', 10, 10);
            pdf.save("Action-Reporting.pdf");
          });
      } else {
        dispatch(validateMEDActionById(pathId, user.user_email, user.user_id, action.user_email));
        dispatch(pushNotification(values)); // Push notification to VM, CDP supervisor || MED supervisor 
        dispatch(messagingValidation(parseInt(user.user_phone_number), action)); // Send a validation message to all destinataires
      }
    }
  }

  const handleDelete = () => {
    let values = {};
    let rejectionVMText = `Action de type ${action.action_type} de la thématique ${action.meeting_theme} de la part du VM ${action.user_email.split("@")[0]} a été supprimée avec succés!`
    let rejectionDSMText = `Action de type ${action.action_type} de la thématique ${action.meeting_theme} de la part du VM ${action.user_email.split("@")[0]} a été rejetée de la part du DSM ${user.user_email}`
    let rejectionCDPText = `Action de type ${action.action_type} de la thématique ${action.meeting_theme} de la part du VM ${action.user_email.split("@")[0]} a été rejetée de la part du chef de projet ${user.user_email}!`
    values.notification_sender = user.user_id;
    values.recieved_since = new Date();
    if (user.user_position === "VM") {   // User type VM
      values.VM_supervisor = user.user_id;
      values.DSM_supervisor = user.DSM_supervisor;
      values.CDP_supervisor = user.CDP_supervisor;
      values.notification_name = rejectionVMText;
      if (action.status === "En attente d'envoie VM") {
        dispatch(removeActionById(pathId)); // Delete action permenantly
        dispatch(pushNotification(values)); // Push notification to VM, DSM supervisor, CDP supervisor or MED
        dispatch(messagingRejection(parseInt(user.user_phone_number), action)); // Send a rejection message to all destinataires
      }
    } else if (user.user_position === "DSM") { // User type DSM
      values.VM_supervisor = action.VM_validation;
      values.DSM_supervisor = user.user_id;
      values.CDP_supervisor = user.CDP_supervisor;
      values.notification_name = rejectionDSMText;
      action.CDP_supervisor = user.CDP_supervisor;
      dispatch(denyDSMActionById(pathId, user.user_id)); // Deny action permenantly
      dispatch(pushNotification(values)); // Push notification to VM, DSM supervisor, CDP supervisor or MED
      dispatch(messagingRejection(parseInt(user.user_phone_number), action)); // Send a rejection message to all destinataires
    } else if (user.user_position === "CDP") { // User type CDP
      if (action.status === "Validée par CDP et en attente de retour agence") {
        history.goBack()
      } else {
        values.VM_supervisor = action.VM_validation;
        values.DSM_supervisor = user.DSM_supervisor;
        values.CDP_supervisor = user.user_id;
        values.notification_name = rejectionCDPText;
        dispatch(denyCDPActionById(pathId, user.user_id)); // Deny action permenantly
        dispatch(pushNotification(values)); // Push notification to VM, DSM supervisor, CDP supervisor or MED
        dispatch(messagingRejection(parseInt(user.user_phone_number), action)); // Send a rejection message to all destinataires
      }
    } else if (user.user_position === "MED") { // User type MED
      values.VM_supervisor = action.VM_validation;
      values.DSM_supervisor = user.DSM_supervisor;
      values.CDP_supervisor = user.user_id;
      values.notification_name = rejectionCDPText;
      dispatch(denyCDPActionById(pathId, user.user_id)); // Deny action permenantly
      dispatch(pushNotification(values)); // Push notification to VM, DSM supervisor, CDP supervisor or MED
      dispatch(messagingRejection(parseInt(user.user_phone_number), action)); // Send a rejection message to all destinataires
    }
  }

  // Component on mount //
  useEffect(() => {
    dispatch(getActionById(pathId)); // Dispatch get action of all action 
    dispatch(retrieveFile(pathId)); // Dispatch get action of all action 
    dispatch(retrieveInvoice(pathId)); // Dispatch get action of all action 
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
  console.log(invoice)
  return (
    <div id="divToPrint" style={{ padding: 16, margin: 'auto', maxWidth: 1225, height: '100%' }}>
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
          {actionFields.map((item, index) => (
            <Grid item xs={item.size} key={index}>
              {item.field}
            </Grid>
          ))}
          <Row>
            <Col lg="6" md="9" sm="12" style={{ marginTop: "32px" }}><InvitedDoctorsFeedback invited_doctors={LastAction.invited_doctors} /></Col>
            <Col lg="6" md="9" sm="12" style={{ marginTop: "32px" }}><InvitedDoctorsSpeciality invited_doctors={LastAction.invited_doctors} /></Col>
          </Row>
          <Grid container alignItems="flex-start" style={{ marginTop: 16 }}>
            <Grid item xs={6} style={{ marginBottom: 16 }}>
              <Typography component="p" className="bold-title">
                {invoice ? 'Factures' : null}
              </Typography>
            </Grid>
          </Grid>
          {invoice ? invoiceFields.map((item, index) => (
            <Grid item xs={item.size} key={index}>
              {item.field}
            </Grid>
          )) : null}
          <Grid container alignItems="flex-start" style={{ marginTop: 32, textAlign: "center", justifyContent: "center" }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleValidate}
              data-html2canvas-ignore="true"
              style={{ marginRight: '25px', display: ((user.user_position === "VM" && action.status === "En attente d'envoie VM") || ((user.user_position === "VM" || "DSM" || "CDP" || "MED") && action.status === "Finalisée") || (user.user_position === "VM" && action.status === "Terminée et non archivée") || (user.user_position === "DSM" && action.status === "En attente de validation DSM") || (user.user_position === "CDP" && action.status === "En attente de validation CDP") || (user.user_position === "CDP" && action.status === "Validée par CDP et en attente de retour agence") || (user.user_position === "CDP" && action.status === "Validée et en attente d'envoie BC") || (user.user_position === "CDP" && action.status === "En attente de validation CDP et MED") || (user.user_position === "MED" && action.status === "En attente de validation CDP et MED") || (user.user_position === "MED" && action.status === "En attente de validation MED") ? 'block' : 'none') }}
            >
              {user.user_position === "VM" && action.status === "En attente d'envoie VM" ? "Envoyer" : user.user_position === "VM" && action.status === "Terminée et non archivée" ? "Archiver" : (user.user_position === "VM" || "DSM" || "CDP" || "MED") && action.status === "Finalisée" ? "Exporter en spreadsheet" : "Valider"}
            </Button>
            <Button
              variant="contained"
              onClick={user.user_position === "VM" ? handleModifyActionById : handleDialogOpen}
              style={{ marginRight: '25px', display: ((user.user_position === "VM" && action.status === "En attente d'envoie VM") || (user.user_position === "DSM" && action.status === "En attente de validation DSM") || (user.user_position === "CDP" && action.status === "En attente de validation CDP") || (user.user_position === "CDP" && action.status === "En attente de validation CDP et MED") || (user.user_position === "MED" && action.status === "En attente de validation CDP et MED") || (user.user_position === "MED" && action.status === "En attente de validation MED") ? 'block' : 'none') }}
            >
              {user.user_position === "VM" && action.status === "En attente d'envoie VM" ? "Modifier" : user.user_position === "DSM" && action.status === "En attente de validation DSM" ? "Retour à la modification" : user.user_position === "CDP" && action.status === "En attente de validation CDP" || action.status === "En attente de validation CDP et MED" ? "Retour à la modification" : user.user_position === "MED" && action.status === "En attente de validation MED" || action.status === "En attente de validation CDP et MED" ? "Retour à la modification" : null}

            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleDelete}
              style={{ marginRight: '25px', display: ((user.user_position === "VM" && action.status === "En attente d'envoie VM") || (user.user_position === "DSM" && action.status === "En attente de validation DSM") || (user.user_position === "CDP" && action.status === "En attente de validation CDP") || (user.user_position === "CDP" && action.status === "Validée par CDP et en attente de retour agence") || (user.user_position === "CDP" && action.status === "En attente de validation CDP et MED") || (user.user_position === "MED" && action.status === "En attente de validation CDP et MED") || (user.user_position === "MED" && action.status === "En attente de validation MED") ? 'block' : 'none') }}
            >
              {user.user_position === "VM" && action.status === "En attente d'envoie VM" ? "Supprimer" : user.user_position === "CDP" && action.status === "Validée par CDP et en attente de retour agence" ? "Retour" : user.user_position === "DSM" && action.status === "En attente de validation DSM" ? "Refuser" : user.user_position === "CDP" && action.status === "En attente de validation CDP" || action.status === "En attente de validation CDP et MED" ? "Refuser" : user.user_position === "MED" && action.status === "En attente de validation MED" || action.status === "En attente de validation CDP et MED" ? "Refuser" : null}
            </Button>
          </Grid>
        </Grid>
        <Dialog
          fullScreen={fullScreen}
          open={open}
          onClose={handleDialoClose}
          aria-labelledby="responsive-dialog-title"
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle id="responsive-dialog-title">{"Raison de modification d'action"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              <TextField
                id="filled-multiline-static"
                label="Décrivez votre raison pour le retour à la modification"
                multiline
                rows={12}
                variant="filled"
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



