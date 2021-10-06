const { sql } = require("../config/db");


// Database function to insert new action  //
const addAction = async (req) => {
  var query = `INSERT INTO actions (user_id, DSM_supervisor, user_position, user_email, action_type, other_stuff, start_action, end_action, schedule, action_town, action_location, other_location, product, speaker, speaker_suggestion, speaker_transfer, speaker_accommodation, meeting_agenda, meeting_theme, pax_number, action_field, invited_doctors, other_doctors, comments) values ('${req.user_id}', '${req.DSM_supervisor}', '${req.user_position}', '${req.user_email}', '${req.action_type}', '${req.other_stuff}', '${req.start_action}', '${req.end_action}', '${req.schedule}', '${req.action_town}', '${req.action_location}', '${req.other_location}', '${req.product}', '${req.speaker}', '${req.speaker_suggestion || null}', '${req.speaker_transfer || 0}', '${req.speaker_accommodation || 0}', '${req.meeting_agenda || null}', '${req.meeting_theme}', '${req.pax_number}', '${req.action_field}', '${req.invited_doctors}', '${req.other_doctors}', '${req.comments}')`;
  try {
    let action = await sql(query);
    return action;
  } catch (err) {
    console.log(err)
  }
}

// Database function to retrieve all actions  //
const getActions = async () => {
  var query = `Select * from actions`;
  try {
    let actions = await sql(query);
    return actions;
  } catch (err) {
    console.log(err)
  }
}

// Database function to retrieve action by ID  //
const getActionById = async (action_id) => {
  var query = `Select * from actions where action_id='${action_id}'`;
  try {
    let action = await sql(query);
    return action[0];
  } catch (err) {
    console.log(err)
  }
}

// Database function to retrieve action by user ID  //
const getActionByUserId = async (user_id) => {
  var query = `Select * from actions where user_id='${user_id}'`;
  try {
    let actions = await sql(query);
    return actions;
  } catch (err) {
    console.log(err)
  }
}

// Database function to retrieve from DSM action by user ID  //
const getDSMActions = async (user_id) => {
  var query = `Select * from actions where DSM_supervisor='${user_id}' AND status != "En attente de validation VM"`;
  try {
    let actions = await sql(query);
    return actions;
  } catch (err) {
    console.log(err)
  }
}

// Database function to retrieve from CDP action by user ID  //
const getCDPActions = async (user_id) => {
  var query = `Select * from actions where CDP_supervisor='${user_id}'`;
  try {
    let actions = await sql(query);
    return actions;
  } catch (err) {
    console.log(err)
  }
}

// Database function to retrieve from CDP action by user ID  //
const getSpeakerActions = async () => {
  var query = `Select * from actions where speaker=1`;
  try {
    let actions = await sql(query);
    return actions;
  } catch (err) {
    console.log(err)
  }
}

// Database function to retrieve from DSM validated action by user ID  //
const getDSMValidatedActions = async (user_id) => {
  var query = `Select * from actions where DSM_validation='${user_id}'`;
  try {
    let actions = await sql(query);
    return actions;
  } catch (err) {
    console.log(err)
  }
}

// Database function to retrieve from CDP validated action by user ID  //
const getCDPValidatedActions = async (user_id) => {
  var query = `Select * from actions where CDP_validation='${user_id}'`;
  try {
    let actions = await sql(query);
    return actions;
  } catch (err) {
    console.log(err)
  }
}

// Database function to retrieve from CDP validated action by user ID  //
const getPendingCDPValidatedActions = async (user_id) => {
  var query = `Select * from actions where status='En attente de validation CDP'`;
  try {
    let actions = await sql(query);
    return actions;
  } catch (err) {
    console.log(err)
  }
}

// Database function to retrieve from MED validated action by user ID  //
const getPendingMEDValidatedActions = async (user_id) => {
  var query = `Select * from actions where status='En attente de validation MED'`;
  try {
    let actions = await sql(query);
    return actions;
  } catch (err) {
    console.log(err)
  }
}

// Database function to retrieve from DSM rejected action by user ID  //
const getDSMRejectedActions = async (user_id) => {
  var query = `Select * from actions where DSM_rejection='${user_id}'`;
  try {
    let actions = await sql(query);
    return actions;
  } catch (err) {
    console.log(err)
  }
}

// Database function to retrieve from CDP rejected action by user ID  //
const getCDPRejectedActions = async (user_id) => {
  var query = `Select * from actions where CDP_rejection='${user_id}'`;
  try {
    let actions = await sql(query);
    return actions;
  } catch (err) {
    console.log(err)
  }
}

// Database function to update action by ID  //
const updateActionById = async (req) => {
  var query = `UPDATE actions SET 
  action_type='${req.action_type}', 
  other_stuff='${req.other_stuff}', 
  start_action='${req.start_action}', 
  end_action='${req.end_action}',
  schedule='${req.schedule}', 
  action_town='${req.action_town}', 
  action_location='${req.action_location}', 
  other_location='${req.other_location}', 
  product='${req.product}', 
  speaker='${req.speaker}', 
  speaker_suggestion='${req.speaker_suggestion}', 
  speaker_transfer='${req.speaker_transfer}', 
  speaker_accommodation='${req.speaker_accommodation}', 
  meeting_agenda='${req.meeting_agenda}', 
  meeting_theme='${req.meeting_theme}', 
  pax_number='${req.pax_number}', 
  action_field='${req.action_field}', 
  invited_doctors='${req.invited_doctors}', 
  other_doctors='${req.other_doctors}', 
  comments='${req.comments}' WHERE action_id='${req.action_id}'`;
  try {
    let action = await sql(query);
    return action;
  } catch (err) {
    console.log(err)
  }
}


// Database function to validate from VM action by ID  //
const validateVMActionById = async (action_id, user_email, user_id) => {
  var query = `UPDATE actions SET status='En attente de validation DSM', VM_validation='${user_id}' WHERE action_id='${action_id}'`;
  try {
    let action = await sql(query);
    return action;
  } catch (err) {
    console.log(err)
  }
}

// Database function to validate from DSM action by ID  //
const validateDSMActionById = async (action_id, user_email, user_id) => {
  var query = `UPDATE actions SET status='En attente de validation CDP', CDP_supervisor='${user_id}' WHERE action_id='${action_id}'`;
  try {
    let action = await sql(query);
    return action;
  } catch (err) {
    console.log(err)
  }
}

// Database function to validate from DSM action by ID  //
const validateDSMSpeakerActionById = async (action_id, user_email, user_id) => {
  var query = `UPDATE actions SET status='En attente de validation CDP et MED', CDP_supervisor='${user_id}' WHERE action_id='${action_id}'`;
  try {
    let action = await sql(query);
    return action;
  } catch (err) {
    console.log(err)
  }
}


// Database function to validate from CDP action by ID  //
const validateFirstCDPActionById = async (action_id, user_email, user_id) => {
  var query = `UPDATE actions SET status='En attente de validation MED', CDP_validation='${user_id}' WHERE action_id='${action_id}'`;
  try {
    let action = await sql(query);
    return action;
  } catch (err) {
    console.log(err)
  }
}

// Database function to validate from CDP action by ID  //
const validateFirstMEDActionById = async (action_id, user_email, user_id) => {
  var query = `UPDATE actions SET status='En attente de validation CDP', MED_validation='${user_id}' WHERE action_id='${action_id}'`;
  try {
    let action = await sql(query);
    return action;
  } catch (err) {
    console.log(err)
  }
}

// Database function to validate from CDP action by ID  //
const validateCDPActionById = async (action_id, user_email, user_id) => {
  var query = `UPDATE actions SET status='Validée par CDP et en attente de retour agence', CDP_validation='${user_id}' WHERE action_id='${action_id}'`;
  try {
    let action = await sql(query);
    return action;
  } catch (err) {
    console.log(err)
  }
}

// Database function to validate from Med action by ID  //
const validateMEDActionById = async (action_id, user_email, user_id) => {
  var query = `UPDATE actions SET status='Validée par CDP et en attente de retour agence', MED_validation='${user_id}' WHERE action_id='${action_id}'`;
  try {
    let action = await sql(query);
    return action;
  } catch (err) {
    console.log(err)
  }
}

// Database function to validate from Med action by ID  //
const validateAgencyActionById = async (action_id) => {
  var query = `UPDATE actions SET status="Validée et en attente d'envoie BC" WHERE action_id='${action_id}'`;
  try {
    let action = await sql(query);
    return action;
  } catch (err) {
    console.log(err)
  }
}

// Database function to reject DSM action to rejected by ID  //
const denyDSMActionById = async (action_id, user_id) => {
  var query = `UPDATE actions SET status='Refusé', DSM_rejection='${user_id}' WHERE action_id='${action_id}'`;
  try {
    let action = await sql(query);
    return action;
  } catch (err) {
    console.log(err)
  }
}

// Database function reject CDP action to rejected by ID  //
const denyCDPActionById = async (action_id, user_id) => {
  var query = `UPDATE actions SET status='Refusé', CDP_rejection='${user_id}' WHERE action_id='${action_id}'`;
  try {
    let action = await sql(query);
    return action;
  } catch (err) {
    console.log(err)
  }
}

// Database function to delete action by ID from VM //
const deleteActionById = async (action_id) => {
  var query = `DELETE from actions where action_id='${action_id}'`;
  try {
    let action = await sql(query);
    return action;
  } catch (err) {
    console.log(err)
  }
}

// Database function to delete action by ID from VM //
const returnActionById = async (action_id) => {
  var query = `UPDATE actions SET status="En attente de validation VM", CDP_supervisor=null where action_id='${action_id}'`;
  try {
    let action = await sql(query);
    return action;
  } catch (err) {
    console.log(err)
  }
}

// Database function to archive action by ID //
const disarchiveActionById = async (action_id) => {
  var query = `UPDATE actions SET status="Terminée et non archivée" where action_id='${action_id}'`;
  try {
    let action = await sql(query);
    return action;
  } catch (err) {
    console.log(err)
  }
}

// Database function to archive action by ID //
const archiveActionById = async (action_id, present_invited_doctors) => {
  let present = present_invited_doctors.join(",");
  var query = `UPDATE actions SET status="Terminée et archivée", present_invited_doctors='${present}' where action_id='${action_id}'`;
  try {
    let action = await sql(query);
    return action;
  } catch (err) {
    console.log(err)
  }
}

// Database function to archive action by ID //
const finishActionById = async (action_id) => {
  var query = `UPDATE actions SET status="Finalisée" where action_id='${action_id}'`;
  try {
    let action = await sql(query);
    return action;
  } catch (err) {
    console.log(err)
  }
}


module.exports = {
  addAction,
  getActions,
  getActionById,
  getActionByUserId,
  getDSMActions,
  getCDPActions,
  getSpeakerActions,
  getDSMValidatedActions,
  getCDPValidatedActions,
  getDSMRejectedActions,
  getCDPRejectedActions,
  getPendingCDPValidatedActions,
  getPendingMEDValidatedActions,
  updateActionById,
  validateDSMActionById,
  validateDSMSpeakerActionById,
  validateVMActionById,
  validateFirstMEDActionById,
  validateFirstCDPActionById,
  validateCDPActionById,
  validateMEDActionById,
  validateAgencyActionById,
  denyDSMActionById,
  denyCDPActionById,
  deleteActionById,
  returnActionById,
  disarchiveActionById,
  archiveActionById,
  finishActionById
}