import React, { useEffect, useState } from "react";
import PageTitle from "../components/common/PageTitle";
import { Row, Col } from "shards-react";
import { useDispatch, useSelector } from "react-redux";
import { getActionById, archiveActionById } from "../actions/actions-initiation-actions/actions";
import { addFile, retriveFile } from "../actions/files-actions/actions";
import InvitedDoctorsSpeciality from "../components/recap-statistics/DoctorsSpeciality";
import InvitedDoctorsFeedback from "../components/recap-statistics/DoctorsFeedback";
import CancelIcon from '@material-ui/icons/Cancel';
import {
  Typography,
  Paper,
  Grid,
  Checkbox,
  Avatar,
  Button,
  FormControl,
  FormGroup,
  FormControlLabel,
} from '@material-ui/core';
import { useHistory } from "react-router-dom";
import { toast } from 'react-toastify';
toast.configure();

const DisplayArchivingAction = () => {
  const dispatch = useDispatch();
  const [LastAction, setLastAction] = useState({});
  const [Speaker, setSpeaker] = useState("");
  const [InvitedDoctors, setInvitedDoctors] = useState([]);
  const [SpeakerTransfer, setSpeakerTransfer] = useState("");
  const [SpeakerAccommodation, setSpeakerAccommodation] = useState("");
  const [StartAction, setStartAction] = useState("");
  const [EndAction, setEndAction] = useState("");
  const [PresentInvitedDoctors, setPresentInvitedDoctors] = useState([]);
  const [Files, setFiles] = useState([]);
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
  // File state from redux store
  const file = useSelector(
    (state) => state.filesReducer.file
  );
  const handleChange = (event) => {
    if (event.target.checked) {
      setPresentInvitedDoctors(oldArray => [...oldArray, event.target.value])
    } else {
      setPresentInvitedDoctors(oldArray => oldArray.filter(e => e !== event.target.value))
    }
  }
  const handleCancel = (name) => {
    setFiles(oldArray => oldArray.filter(e => e.name !== name));
  }
  const handleFileChange = (event) => {
    let collectionImg = [];
    let files = event.target.files;
    for (let i = 0; i < files.length; i++) {
      collectionImg.push(files[i]);
    }
    setFiles(collectionImg);
  }
  const onSubmit = () => {
    const formData = new FormData(); // Create an instance of FormData
    for (const key of Object.keys(Files)) {
      formData.append('imgCollection', Files[key])
    }
    formData.append("action", action.action_id);
    formData.append("user", user.user_id);
    dispatch(addFile(formData));
    dispatch(archiveActionById(action.action_id, PresentInvitedDoctors));
  }
    // Component on mount //
    useEffect(() => {
      dispatch(getActionById(pathId)); // Dispatch get action of all action 
      dispatch(retriveFile(pathId)); // Dispatch get action of all action 
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
        if (action.invited_doctors) {
          setInvitedDoctors(action.invited_doctors.split(",")); // Set invited doctors array
        }
      }
    }, [LastAction.start_action, LastAction.end_action, action]);
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
        <Typography className={"typography"} style={{ marginTop: "18px", borderTop: "1px solid" }}>
          Liste médecins invités :
        </Typography>
      ),
    },
    {
      size: 3,
      field: (
        <Typography className={"typography"} style={{ marginTop: "18px", borderTop: "1px solid" }}>
          {user.user_position === "VM" && action.status === "Terminée et non archivée" ? InvitedDoctors.map((element, key) => {
            return (
              <FormControl key={key}>
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox onChange={handleChange} value={element} name={element} id={key} />}
                    label={element}
                  />
                </FormGroup>
              </FormControl>
            )
          }) : InvitedDoctors.map((element, key) => {
            return (
              <li style={{ marginTop: "8px" }} key={key}>{element}</li>
            )
          })}
        </Typography>
      ),
    },
    {
      size: 3,
      field: (
        <Typography className={"typography"} style={{ marginTop: "18px", borderTop: "1px solid" }}>
          Liste médecins invités présents :
        </Typography>
      ),
    },
    {
      size: 3,
      field: (
        <Typography className={"typography"} style={{ marginTop: "18px", borderTop: "1px solid" }}>
          {action.present_invited_doctors ? action.present_invited_doctors.split(",").map((element, key) => (
            <div>
              <ul key={key}>
                <li value={element}>{element}</li>
              </ul>
            </div>
          )) : PresentInvitedDoctors.map((element, key) => (
            <div>
              <ul key={key}>
                <li id={`invited-${key}`} value={element}>{element}</li>
              </ul>
            </div>
          ))}
        </Typography>
      ),
    },
    {
      size: 6,
      field: (
        <Typography className={"typography"} style={user.user_position === "VM" && action.status === "Terminée et non archivée" ? { marginTop: "18px", borderTop: "1px solid" } : { display: "none", marginTop: "18px", borderTop: "1px solid" }}>
          Télèverser:
        </Typography>
      ),
    },
    {
      size: 6,
      field: (
        <input
          type="file"
          name="fileUpload"
          onChange={handleFileChange}
          style={user.user_position === "VM" && action.status === "Terminée et non archivée" ? { width: "100%", marginTop: "18px",  borderTop: "1px solid" } : { display: "none", marginTop: "18px", borderTop: "1px solid", width: "100%" }}
          multiple
        />
      ),
    },
    {
      size: 3,
      field: (
        <Typography className={"typography"} style={{ marginTop: "18px", borderTop: "1px solid" }}>
          Fichiers télèversés :
        </Typography>
      ),
    },
    {
      size: 9,
      field: (
        <Typography className={"typography"} style={{ marginTop: "18px", borderTop: "1px solid", width: "100%" }}>
            <Grid item xs={12}>
              <Grid container justifyContent="center" spacing={2}>
                {file.file_name && file.file_name.split(",").map((element, key) => (
                  <Grid key={key} item>
                    <Avatar style={{ width: 150, height: 150 }} alt="uploaded-file" className="file" src={element} variant="rounded" id={key} />
                  </Grid>
                ))}
              </Grid>
            </Grid>
            <Grid item xs={12} style={{ marginTop:"16px" }}>
              <Grid container spacing={2} justifyContent="center" >
                {Files && Files.map((element, key) => (
                  <Grid key={key} item>
                    <CancelIcon onClick={() => handleCancel(element.name)} style={{ cursor: 'pointer', float: 'right' }}></CancelIcon>
                    <Avatar style={{ width: 150, height: 150 }} alt="uploaded-file" className="file" src={URL.createObjectURL(element)} variant="rounded" id={key} />
                  </Grid>
                ))}
              </Grid>
            </Grid>
        </Typography>
 
      ),
    },
  ];
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
              onClick={onSubmit}
              style={{ marginRight: '25px', display: ((user.user_position === "VM" && action.status === "En attente de validation VM") || (user.user_position === "VM" && action.status === "Terminée et non archivée") || (user.user_position === "VM" && action.status === "Validé") || (user.user_position === "DSM" && action.status === "En attente de validation DSM") || (user.user_position === "CDP" && action.status === "En attente de validation CDP") || (user.user_position === "CDP" && action.status === "En attente de validation CDP et MED") || (user.user_position === "MED" && action.status === "En attente de validation CDP et MED") || (user.user_position === "MED" && action.status === "En attente de validation MED") ? 'block' : 'none') }}
            >
              Archiver
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </div>
  )
}

export default DisplayArchivingAction;



