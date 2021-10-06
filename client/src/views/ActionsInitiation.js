import React, { useEffect, useState } from 'react';
import { Form, Field } from 'react-final-form';
import { useHistory } from "react-router-dom";
import {
  TextField,
  Select,
} from 'mui-rff';
import {
  Typography,
  Paper,
  Grid,
  Button,
  MenuItem,
  RadioGroup,
  FormControlLabel,
  CircularProgress,
} from '@material-ui/core';

import PageTitle from "../components/common/PageTitle";
import Radio from '@material-ui/core/Radio';
import { Row } from "shards-react";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { useDispatch, useSelector } from "react-redux";
import { addAction, modifyActionById } from "../actions/actions-initiation-actions/actions";
import { getLocalisations } from "../actions/localisations-actions/actions";
import { getDoctors } from "../actions/doctors-actions/actions";
import DateFnsUtils from '@date-io/date-fns';
import MomentUtils from '@date-io/moment';
import { Hint } from 'react-autocomplete-hint';
import $ from "jquery";
import Fuse from 'fuse.js'

const ActionsInitiation = () => {
  const [FilteredDoctors, setFilteredDoctors] = useState([]);
  const [FilteredGeoLocalisation, setFilteredGeoLocalisation] = useState([]);
  const [File, setFile] = useState([]);
  const [Count, setCount] = useState(0);
  const [StartAction, setStartAction] = useState("");
  const [EndAction, setEndAction] = useState("");
  const [Speaker, setSpeaker] = useState("0");
  const [SpeakerTransfer, setSpeakerTransfer] = useState("0");
  const [SpeakerAccommodation, setSpeakerAccommodation] = useState("0");
  const [Text, setText] = useState("");

  const history = useHistory();
  const dispatch = useDispatch();

  // User state from redux store
  const user = useSelector(
    (state) => state.authReducer.user[0]
  );
  // Action state from redux store
  const action = useSelector(
    (state) => state.actionsReducer.action
  );
  // Doctors state from redux store
  const doctors = useSelector(
    (state) => state.doctorsReducer.doctors
  );
  // Loading state from redux store
  const isLoading = useSelector(
    (state) => state.doctorsReducer.isLoading
  );
  // Localisations state from redux store
  const localisations = useSelector(
    (state) => state.localisationsReducer.localisations
  );

  // Dummy data => API's later //
  const products = [
    "produit-A",
    "produit-B",
    "produit-C",
    "produit-D",
    "produit-E",
    "produit-F",
  ];

  const speciality = [
    'Chirugien',
    'Médecin Général',
    'Neuphrologie',
    'Médecin de travail',
    'Generaliste',
    "Médecin enfant"
  ];

  const location = [
    "Ras Djbal: Bizerte",
    "Ain Mariem: Bizerte",
    "Ain midoun: Medenine",
    "Djerba: Medenine",
    "Sers: Le Kef",
    "Tejrouine: Le Kef",
    "Hay tahrir: Tunis"
  ];
  // Dummy data => API's later //

  //  Global variables //
  let filter = [];
  let filteredDoctors = [];
  let filteredGeolocalisation = [];
  //  Global variables //

  // Function to handle Filter of doctors
  const handleFilteredDoctors = () => {
    let counter = 0;
    setFilteredDoctors(doctors); // Set all available doctors data
    let options = $(".MuiSelect-select.MuiSelect-select[name='action_field'] option:selected");
    options.each((index, element) => {
      filter.push(element.value);
    })
    for (let k = 0; k < filter.length; k++) {
      for (let l = 0; l < doctors.length; l++) {
        if (filter[k].includes(doctors[l].doctor_field)) {
          filteredDoctors = filteredDoctors.concat(doctors.filter(element => element.doctor_field === filter[k])) // Concat all object that correspond to the condition
          filteredDoctors = filteredDoctors.filter((item, index) => filteredDoctors.indexOf(item) === index); // Avoid duplicated objects
          setFilteredDoctors(filteredDoctors); // Hook filtered doctors to local state
        } else if (!filter[k].includes(doctors[l].doctor_field)) {
          counter++;
          if (counter === doctors.length) {
            setFilteredDoctors([]); // None selected value
          } else {
            setFilteredDoctors(filteredDoctors); // Hook filtered doctors to local state
          }
        } else {
          setFilteredDoctors([]); // None of conditions
        }
      }
    }
  }

  // Function to count invited_doctors
  const handleNumberDoctors = () => {
    let counter = $("#invited-doctors option:selected").length; // Selected options length
    setCount(counter); // Hook number of invited doctors to local state
  }
  // Handle keyboard CTRL + A selection of number of invited_doctors
  $(document).ready(function () {
    let ctrlDown = false;
    let ctrlKey = 17;
    let aKey = 65;
    let field = document.getElementById("speciality-field");
    let invited = document.getElementById("invited-doctors");
    if (field) {
      field.addEventListener("keydown", (event) => {
        if (event.keyCode === ctrlKey) {
          ctrlDown = true;
        }
        if (ctrlDown && (event.keyCode == aKey)) {
          setFilteredDoctors(doctors); // Hook all invited doctors to local state
        }
      });
    }
    if (invited) {
      invited.addEventListener("keydown", (event) => {
        if (event.keyCode === ctrlKey) {
          ctrlDown = true;
        }
        if (ctrlDown && (event.keyCode == aKey)) {
          if (FilteredDoctors.length === doctors.length) {
            setCount(doctors.length); // Hook number of all invited doctors to local state
          } else {
            setCount(FilteredDoctors.length); // Hook number of filtered invited doctors to local state
          }
        }
      });
    }
  })


  // Function to handle Filter geolocalisation
  const handleFilteredGeolocalisation = () => {
    setFilteredGeoLocalisation([]); // Clear data
    $(document).ready(() => {
      let element = $(".MuiList-padding");
      for (let i = 0; i < element[0].children.length; i++) {
        for (let j = 0; j < location.length; j++) {
          if (element[0].children[i].selected && element[0].children[i].value === location[j].split(': ').pop()) {
            filteredGeolocalisation = filteredGeolocalisation.concat(location[j])
            setFilteredGeoLocalisation(filteredGeolocalisation); // Hook filtered localisation to local state
          }
        }
      }
    });
  }

  // Search handler
  const fuse = new Fuse(FilteredDoctors, {
    keys: ['doctor_lname', 'doctor_fname', 'doctor_field']
  })

  // Function to handle Search //
  const handleSearch = (e) => {
    let filteredDoctors = [];
    e.preventDefault(); // Prevent default behavior
    let text = "";
    setText(e.target.value); // Set text of user to local state
    if (Text.length) {
      text = Text.toLowerCase(); // Transform all text type to lowcase
      const results = fuse.search(text)
      for (let i = 0; i < results.length; i++) {
        if (results[i].item.doctor_lname.trim().toLowerCase().indexOf(text) !== -1 || results[i].item.doctor_fname.trim().toLowerCase().indexOf(text) !== -1 || results[i].item.doctor_field.trim().toLowerCase().indexOf(text) !== -1) {
          filteredDoctors.push(results[i].item);
          setFilteredDoctors(filteredDoctors); // Hook filtered doctors to local state
        }
      }
    }

    // Handle empty text
    if (e.target.value.length === 0) {
      handleFilteredDoctors(); // Execute function to filter displayed doctors
    }
  }

  // Function to handle file change
  const onFileChange = function (e) {
    setFile(e.target.files[0]); // Hook file to local state
  }

  // Function to display extra inputs
  const toggleRadioButton = () => {
    let element = $(".extra-speaker-elements");
    element.toggle();
  }

  const handleBack = () => {
    history.goBack();
  }

  // Validator for required fields //
  const validate = values => {
    const errors = {};
    if (!values.action_type) {
      errors.action_type = 'Champ requis';
    }
    if (!values.start_action) {
      errors.start_action = 'Champ requis';
    }
    if (!values.schedule) {
      errors.schedule = 'Champ requis';
    }
    if (!values.action_town) {
      errors.action_town = 'Champ requis';
    }
    if (!values.action_location) {
      errors.action_location = 'Champ requis';
    }
    if (!values.product) {
      errors.product = 'Champ requis';
    }
    if (!values.meeting_theme) {
      errors.meeting_theme = 'Champ requis';
    }
    if (!values.pax_number) {
      errors.pax_number = 'Champ requis';
    }
    if (!values.invited_doctors) {
      errors.invited_doctors = 'Champ requis';
    }
    return errors;
  };

  // Submit Form Group inputs
  const onSubmit = async (values) => {
    const formData = new FormData(); // Create an instance of FormData
    if (!values.end_action) {
      values.end_action = '2021-12-31'
    }
    if (!values.comments) {
      values.comments = 'Non spécifié';
    }
    if (!values.speaker_suggestion) {
      values.speaker_suggestion = 'Non spécifié';
    }
    if (!values.other_location) {
      values.other_location = 'Non spécifié';
    }
    if (!values.other_doctors) {
      values.other_doctors = 'Non spécifié';
    }
    if (!values.other_stuff) {
      values.other_stuff = 'Non spécifié';
    }
    values.user_id = user.user_id;
    values.user_email = user.user_email;
    values.DSM_supervisor = user.DSM_supervisor;
    values.user_position = user.user_position;
    values.user_email = user.user_email;
    values.speaker = parseInt(Speaker); // Parse string type to integer
    values.speaker_transfer = parseInt(SpeakerTransfer); // Parse string type to integer
    values.speaker_accommodation = parseInt(SpeakerAccommodation); // Parse string type to integer
    if (File.name) {
      formData.append("file", File, File.name); // Append file to formData
      formData.append("values", JSON.stringify(values)); // Append all data except file upload to formData
    } else {
      formData.append("values", JSON.stringify(values)); // Append all data except file upload to formData
    }
    if (action.action_id) {
      dispatch(modifyActionById(action.action_id, formData));
      history.push(`/display-action/${action.action_id}`); // Redirect user after update of form
    } else {
      const insertedActionId = await dispatch(addAction(formData)); // Dispatch post action
      if (insertedActionId) {
        history.push(`/display-action/${insertedActionId}`); // Redirect user after submition of form
      }
    }
  };

  // Component on mount //
  useEffect(() => {
    dispatch(getDoctors()); // Dispatch get action of all doctors 
    dispatch(getLocalisations()); // Dispatch get action of localisations
  }, [dispatch])
  useEffect(() => {
    let startAction = "";
    let endAction = "";
    let element = $(".extra-speaker-elements");
    element.hide();
    if (action.start_action) {
      startAction = (new Date(action.start_action)).toLocaleDateString();
      setStartAction(startAction.split("/").reverse().join('-'));
    }
    if (action.end_action) {
      endAction = (new Date(action.end_action)).toLocaleDateString();
      setEndAction(endAction.split("/").reverse().join('-'));
    }
    if (action.action_id) {
      setFilteredGeoLocalisation([action.action_location]);
      let invitedDoctors = action.invited_doctors.split(",");
      for (let i = 0; i < doctors.length; i++) {
        for (let j = 0; j < invitedDoctors.length; j++) {
          if ((doctors[i].doctor_lname + " " + doctors[i].doctor_fname) === invitedDoctors[j]) {
            filteredDoctors.push(doctors[i]);
            setFilteredDoctors(filteredDoctors); // Hook filtered doctors to local state
            setCount(filteredDoctors.length); // Hook number of invited doctors to local state
          }
        }
      }
    } else {
      setFilteredDoctors(doctors); // Hook all available doctors to local state
    }
  }, [doctors, localisations, action])
  // Component on mount //

  // All displayed fields form //
  const formFields = [
    {
      size: 3,
      field: (
        <Typography className={"typography"} style={{ marginTop: "18px" }}>
          Type d’action : <span className="red-star">*</span>
        </Typography>
      ),
    },
    {
      size: 9,
      field: (
        <Field name="action_type" initialValue={action.action_type}>
          {props => (
            <div>
              <Select
                name="action_type"
                label="Selectionner le type d'action"
                formControlProps={{ margin: 'none' }}
                type="select"
              >
                <MenuItem value="Congré National">Congrés National</MenuItem>
                <MenuItem value="Congrés International">Congrés International</MenuItem>
                <MenuItem value="Simosium National">Simosium National</MenuItem>
                <MenuItem value="Simosium International">Simosium International</MenuItem>
                <MenuItem value="Projet">Projet</MenuItem>
              </Select>
            </div>
          )}
        </Field>
      ),
    },
    {
      size: 3,
      field: (
        <Typography className={"typography"} style={{ marginTop: "18px" }}>
          Autre staff Sanofi :
        </Typography>
      ),
    },
    {
      size: 9,
      field: (
        <Field name="other_stuff" initialValue={action.other_stuff}>
          {props => (
            <div>
              <Select
                name="other_stuff"
                label="Selectionner"
                formControlProps={{ margin: 'none' }}
                type="select"
              >
                <MenuItem value="Staff">Staff</MenuItem>
                <MenuItem value="TR">TR</MenuItem>
                <MenuItem value="EPU">EPU</MenuItem>
                <MenuItem value="Atelier">Atelier</MenuItem>
              </Select>
            </div>
          )}
        </Field>
      ),
    },
    {
      size: 3,
      field: (
        <Typography className={"typography"} style={{ marginTop: "18px" }}>
          Date début de l’action : <span className="red-star">*</span>
        </Typography>
      ),
    },
    {
      size: 9,
      field:
        <Field name="start_action" initialValue={StartAction}>
          {props => (
            <div>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <TextField
                  id="date"
                  type="date"
                  name="start_action"
                  InputProps={{ inputProps: { min: new Date().toLocaleDateString().split('/').reverse().join('-') } }}
                />
              </MuiPickersUtilsProvider>
            </div>
          )}
        </Field>
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
      size: 9,
      field:
        <Field name="end_action" initialValue={EndAction}>
          {props => (
            <div>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <TextField
                  id="date"
                  type="date"
                  name="end_action"
                  InputProps={{ inputProps: { min: new Date().toLocaleDateString().split('/').reverse().join('-') } }}
                />
              </MuiPickersUtilsProvider>
            </div>
          )}
        </Field>
    },
    {
      size: 3,
      field: (
        <Typography className={"typography"} style={{ marginTop: "18px" }}>
          Horaire : <span className="red-star">*</span>
        </Typography>
      ),
    },
    {
      size: 9,
      field:
        <Field name="schedule" initialValue={action.schedule}>
          {props => (
            <div>
              <MuiPickersUtilsProvider utils={MomentUtils}>
                <TextField
                  id="date"
                  type="time"
                  name="schedule"
                />
              </MuiPickersUtilsProvider>
            </div>
          )}
        </Field>
    },
    {
      size: 3,
      field: (
        <Typography className={"typography"} style={{ marginTop: "18px" }}>
          Ville : <span className="red-star">*</span>
        </Typography>
      ),
    },
    {
      size: 9,
      field: (
        <Field name="action_town" initialValue={action.action_town}>
          {props => (
            <div>
              <Select
                id="action_town"
                name="action_town"
                label="Selectionner la ville"
                formControlProps={{ margin: 'none' }}
                onClick={handleFilteredGeolocalisation}
                type="select"
              >
                {localisations.map((element, key) => {
                  return (
                    <option key={key} value={element.localisation_name}>
                      {element.localisation_name}
                    </option>
                  )
                })}
              </Select>
            </div>
          )}
        </Field>
      ),
    },
    {
      size: 3,
      field: (
        <Typography className={"typography"} style={{ marginTop: "18px" }}>
          Lieu : <span className="red-star">*</span>
        </Typography>
      ),
    },
    {
      size: 9,
      field: (
        <Field name="action_location" initialValue={action.action_location}>
          {props => (
            <div>
              <Select
                name="action_location"
                label="Selectionner le lieu"
                formControlProps={{ margin: 'none' }}
                type="select"
              >
                {FilteredGeoLocalisation.map((element, key) => {
                  return (
                    <option key={key} value={element}>{element}</option>
                  )
                })}
              </Select>
            </div>
          )}
        </Field>
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
      size: 9,
      field: (
        <Field name="other_location" initialValue={action.other_location}>
          {props => (
            <div>
              <TextField
                label="Selectionner autre lieu"
                name="other_location"
                margin="none"
              />
            </div>
          )}
        </Field>
      ),
    },
    {
      size: 3,
      field: (
        <Typography className={"typography"} style={{ marginTop: "18px" }}>
          Produit : <span className="red-star">*</span>
        </Typography>
      ),
    },
    {
      size: 9,
      field: (
        <Field name="product" initialValue={action.product ? action.product.split(",") : null}>
          {props => (
            <div>
              <Select
                name="product"
                type="select"
                multiple
                native
              >
                {products.map((element, key) => {
                  return (<option key={key} value={element}>{element}</option>)
                })}
              </Select>
            </div>
          )}
        </Field>
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
      size: 9,
      field: (
        <Field name="speaker" initialValue={action.speaker}>
          {props => (
            <div>
              <RadioGroup defaultValue={Speaker} className="radio-group" onChange={(e) => {
                setSpeaker(e.target.value);
                toggleRadioButton();
              }}>
                <FormControlLabel value="1" name="radio-1" control={<Radio id="y" />} label="Oui" id="yes" />
                <FormControlLabel value="0" name="radio-2" control={<Radio id="n" />} label="Non" id="no" />
              </RadioGroup>
            </div>
          )}
        </Field>
      ),
    },
    {
      size: 3,
      display: true,
      field: (
        <Typography style={{ marginTop: "18px" }}>
          Propositions d'orateur :
        </Typography>
      ),
    },
    {
      size: 9,
      display: true,
      field: (
        <Field name="speaker_suggestion" initialValue={action.speaker_suggestion} >
          {props => (
            <div>
              <TextField
                name="speaker_suggestion"
                placeholder="Propositions"
              />
            </div>
          )}
        </Field>
      ),
    },
    {
      size: 3,
      display: true,
      field: (
        <Typography style={{ marginTop: "18px" }}>
          Transfert :
        </Typography>
      ),
    },
    {
      size: 9,
      display: true,
      field: (
        <Field name="speaker_transfer" intialize={action.speaker_transfer}>
          {props => (
            <div>
              <RadioGroup defaultValue={SpeakerTransfer} onChange={(e) => setSpeakerTransfer(e.target.value)} >
                <FormControlLabel value="1" name="radio-1" control={<Radio />} label="Oui" />
                <FormControlLabel value="0" name="radio-2" control={<Radio />} label="Non" />
              </RadioGroup>
            </div>
          )}
        </Field>
      ),
    },
    {
      size: 3,
      display: true,
      field: (
        <Typography style={{ marginTop: "18px" }}>
          Hébergement :
        </Typography>
      ),
    },
    {
      size: 9,
      display: true,
      field: (
        <Field name="speaker_accommodation" initial={action.speaker_accommodation}>
          {props => (
            <div>
              <RadioGroup defaultValue={SpeakerAccommodation} onChange={(e) => setSpeakerAccommodation(e.target.value)} >
                <FormControlLabel value="1" name="radio-1" control={<Radio />} label="Oui" />
                <FormControlLabel value="0" name="radio-2" control={<Radio />} label="Non" />
              </RadioGroup>
            </div>
          )}
        </Field>
      ),
    },
    {
      size: 3,
      display: true,
      field: (
        <Typography style={{ marginTop: "18px" }}>
          Agenda de la réunion :
        </Typography>
      ),
    },
    {
      size: 9,
      display: true,
      field: (
        <Field name="meeting_agenda" initialValue={action.meeting_agenda}>
          {props => (
            <div>
              <TextField
                name="meeting_agenda"
                margin="none"
                type="file"
                onChange={onFileChange}
                value={File.filename}
              />
            </div>
          )}
        </Field>
      ),
    },

    {
      size: 3,
      field: (
        <Typography className={"typography"} style={{ marginTop: "18px" }}>
          Theme de la réunion : <span className="red-star">*</span>
        </Typography>
      ),
    },
    {
      size: 9,
      field: (
        <Field name="meeting_theme" initialValue={action.meeting_theme}>
          {props => (
            <div>
              <TextField
                label="Choisissez le théme de la réunion"
                name="meeting_theme"
                margin="none"
              />
            </div>
          )}
        </Field>
      ),
    },
    {
      size: 3,
      field: (
        <Typography className={"typography"} style={{ marginTop: "18px" }}>
          Nombre des invités : <span className="red-star">*</span>
        </Typography>
      ),
    },
    {
      size: 9,
      field: (
        <Field name="pax_number" initialValue={action.pax_number}>
          {props => (
            <div>
              <TextField
                label="Tapez le nombre des invités"
                name="pax_number"
                margin="none"
                type="number"
              />
            </div>
          )}
        </Field>
      ),
    },
    {
      size: 3,
      field: (
        <Typography className={"typography"} style={{ marginTop: "18px" }}>
          Filtre de spécialité :
        </Typography>
      ),
    },
    {
      size: 9,
      field: (
        <Field name="action_field" initialValue={action.action_field ? action.action_field.split(",") : null}>
          {props => (
            <div>
              <Select
                name="action_field"
                type="select"
                id="speciality-field"
                formControlProps={{ margin: 'none' }}
                multiple
                native
                onClick={handleFilteredDoctors}
              >
                {speciality.map((element, key) => {
                  return (
                    <option key={key} value={element}>
                      {element}
                    </option>
                  )
                })}
              </Select>
            </div>
          )}
        </Field>
      ),
    },
    {
      size: 3,
      field: (
        <Typography className={"typography"} style={{ marginTop: "18px" }}>
          Médecins invités {Count}: <span className="red-star">*</span>
        </Typography>
      ),
    },
    {
      size: 9,
      field: (<div>
        <Hint options={products} allowTabFill disableHint>
          <input className='input-with-hint'
            value={Text}
            onChange={handleSearch}
            placeholder="Search"
          />
        </Hint>
        <Field type="select" name="invited_doctors" initialValue={action.invited_doctors ? action.invited_doctors.split(",") : null}>
          {props => (
            <div>
              <Select
                name="invited_doctors"
                formControlProps={{ margin: 'none' }}
                multiple
                type="select"
                native
                onClick={handleNumberDoctors}
                id="invited-doctors"
              >
                {FilteredDoctors.map((element, key) => {
                  return (<option key={key} value={element.doctor_lname + ' ' + element.doctor_fname}>
                    {element.doctor_lname} {element.doctor_fname} : ({element.doctor_field})
                  </option>)
                })}
              </Select>
            </div>
          )}
        </Field>
      </div>
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
      size: 9,
      field: (
        <Field name="other_doctors" initialValue={action.other_doctors}>
          {props => (
            <div>
              <TextField
                type="text"
                label="Tapez autres médecins"
                name="other_doctors"
                margin="none"
              />
            </div>
          )}
        </Field>
      ),
    },
    {
      size: 3,
      field: (
        <Typography className={"typography"} style={{ marginTop: "18px" }}>
          Commentaires (optionnel):
        </Typography>
      ),
    },
    {
      size: 9,
      field: (
        <Field name="comments" initialValue={action.comments}>
          {props => (
            <div>
              <TextField
                type="text"
                label="Tapez des commentaires"
                name="comments"
                margin="none"
              />
            </div>
          )}
        </Field>
      ),
    },
  ];
  if (!isLoading) {
    return (
      <div className="container" style={{ padding: 16, margin: 'auto', maxWidth: 1225, height: '100%' }}>
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <PageTitle sm="4" title="Initiation d'action" subtitle="Link-D / Actions" />
        </Row>
        <Form
          onSubmit={onSubmit}
          validate={validate}
          render={({ handleSubmit, form }) => (
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <Paper style={{ padding: 16 }}>
                <Grid item xs={12}>
                  <Typography variant="h5" component="p">
                    Demande d'action
                  </Typography>
                </Grid>
                <Grid container alignItems="flex-start" spacing={2}>
                  {formFields.map((item, index) => (
                    <Grid className={item.display ? "extra-speaker-elements" : null} item xs={item.size} key={index}>
                      {item.field}
                    </Grid>
                  ))}
                  <Grid item style={{ marginTop: 16 }}>
                    <Button
                      type="button"
                      variant="contained"
                      onClick={handleBack}
                    >
                      Précedent
                    </Button>
                  </Grid>
                  <Grid item style={{ marginTop: 16 }}>
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                    >
                      Suivant
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            </form>
          )}
        />
      </div>
    );
  }
  return (
    <CircularProgress color="primary" /> // Loading Spinner
  )
}

export default ActionsInitiation