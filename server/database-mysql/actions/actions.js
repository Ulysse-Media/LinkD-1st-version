const { sql } = require("../config/db");


// Database function to insert new action  //
const addAction = async (req) => {
  var query = `INSERT INTO actions (user_id, user_position, user_email, action_type, other_stuff, start_action, end_action, schedule, action_town, action_location, other_location, product, speaker, speaker_suggestion, speaker_transfer, speaker_accommodation, meeting_agenda, meeting_theme, pax_number, action_field, invited_doctors, other_doctors, comments) values ('${req.user_id}', '${req.user_position}', '${req.user_email}', '${req.action_type}', '${req.other_stuff}', '${req.start_action}', '${req.end_action}', '${req.schedule}', '${req.action_town}', '${req.action_location}', '${req.other_location}', '${req.product}', '${req.speaker}', '${req.speaker_suggestion || null}', '${req.speaker_transfer || 0}', '${req.speaker_accommodation || 0}', '${req.meeting_agenda || null}', '${req.meeting_theme}', '${req.pax_number}', '${req.action_field}', '${req.invited_doctors}', '${req.other_doctors}', '${req.comments}')`;
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

// Database function to retrieve all actions  //
const getLastAction = async () => {
  var query = `SELECT * FROM actions ORDER BY action_id DESC LIMIT 1`;
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

// Database function to retrieve action by ID  //
const getActionByUserId = async (user_id) => {
  var query = `Select * from actions where user_id='${user_id}'`;
  try {
    let actions = await sql(query);
    return actions;
  } catch (err) {
    console.log(err)
  }
}

// Database function to retrieve action by ID  //
const getActionByUserPosition = async (user_position) => {
  var query = `Select * from actions where user_position=${user_position}`;
  try {
    let actions = await sql(query);
    return actions;
  } catch (err) {
    console.log(err)
  }
}

// Database function to retrieve action by ID  //
const getActionByStatus = async (status) => {
  var query = `Select * from actions where status='${status}'`;
  try {
    let actions = await sql(query);
    return actions;
  } catch (err) {
    console.log(err)
  }
}

// Database function to retrieve validated action by user ID  //
const getDSMValidatedActions = async (user_id) => {
  var query = `Select * from actions where DSM_validation='${user_id}'`;
  try {
    let actions = await sql(query);
    return actions;
  } catch (err) {
    console.log(err)
  }
}

// Database function to retrieve validated action by user ID  //
const getCDPValidatedActions = async (user_id) => {
  var query = `Select * from actions where CDP_validation='${user_id}'`;
  try {
    let actions = await sql(query);
    return actions;
  } catch (err) {
    console.log(err)
  }
}

// Database function to retrieve rejected action by user ID  //
const getDSMRejectedActions = async (user_id) => {
  var query = `Select * from actions where DSM_rejection='${user_id}'`;
  try {
    let actions = await sql(query);
    return actions;
  } catch (err) {
    console.log(err)
  }
}

// Database function to retrieve rejected action by user ID  //
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


// Database function to update status of action by ID  //
const validateVMActionById = async (action_id, user_email, user_id) => {
  var query = `UPDATE actions SET status='En attente de validation DSM', VM_validation='${user_id}' WHERE action_id='${action_id}'`;
  try {
    let action = await sql(query);
    return action;
  } catch (err) {
    console.log(err)
  }
}

// Database function to update status of action by ID  //
const validateDSMActionById = async (action_id, user_email, user_id) => {
  var query = `UPDATE actions SET status='En attente de validation CDP', DSM_validation='${user_id}' WHERE action_id='${action_id}'`;
  try {
    let action = await sql(query);
    return action;
  } catch (err) {
    console.log(err)
  }
}


// Database function to update status of action by ID  //
const validateCDPActionById = async (action_id, user_email, user_id) => {
  var query = `UPDATE actions SET status='Validé', CDP_validation='${user_id}' WHERE action_id='${action_id}'`;
  try {
    let action = await sql(query);
    return action;
  } catch (err) {
    console.log(err)
  }
}

// Database function to update status of action by ID  //
const denyDSMActionById = async (action_id, user_id) => {
  var query = `UPDATE actions SET status='Refusé', DSM_rejection='${user_id}' WHERE action_id='${action_id}'`;
  try {
    let action = await sql(query);
    return action;
  } catch (err) {
    console.log(err)
  }
}

// Database function to update status of action by ID  //
const denyCDPActionById = async (action_id, user_id) => {
  var query = `UPDATE actions SET status='Refusé', CDP_rejection='${user_id}' WHERE action_id='${action_id}'`;
  try {
    let action = await sql(query);
    return action;
  } catch (err) {
    console.log(err)
  }
}

// Database function to delete action by ID  //
const deleteActionById = async (action_id) => {
  var query = `DELETE from actions where action_id='${action_id}'`;
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
  getLastAction,
  getActionByUserPosition,
  getActionByStatus,
  getDSMValidatedActions,
  getCDPValidatedActions,
  getDSMRejectedActions,
  getCDPRejectedActions,
  updateActionById,
  validateDSMActionById,
  validateVMActionById,
  validateCDPActionById,
  denyDSMActionById,
  denyCDPActionById,
  deleteActionById,
}