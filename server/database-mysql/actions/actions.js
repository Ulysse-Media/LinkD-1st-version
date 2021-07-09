const { sql } = require("../config/db");


// Database function to insert new action  //
const addAction = async (req) => {
  var query = `INSERT INTO actions (user_id, action_type, other_stuff, start_action, end_action, schedule, action_town, action_location, other_location, product, speaker, speaker_suggestion, speaker_transfer, speaker_accommodation, meeting_agenda, meeting_theme, pax_number, action_field, invited_doctors, other_doctors, comments) values ('${req.user_id}', '${req.action_type}', '${req.other_stuff}', '${req.start_action}', '${req.end_action}', '${req.schedule}', '${req.action_town}', '${req.action_location}', '${req.other_location}', '${req.product}', '${req.speaker}', '${req.speaker_suggestion || null}', '${req.speaker_transfer || 0}', '${req.speaker_accommodation || 0}', '${req.meeting_agenda || null}', '${req.meeting_theme}', '${req.pax_number}', '${req.action_field}', '${req.invited_doctors}', '${req.other_doctors}', '${req.comments}')`;
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
const getActionById = async (req) => {
  var query = `Select * from actions where action_id='${req}'`;
  try {
    let action = await sql(query);
    return action[0];
  } catch (err) {
    console.log(err)
  }
}

// Database function to retrieve action by ID  //
const getActionByUserId = async (req) => {
  var query = `Select * from actions where user_id='${req}'`;
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
const denyActionById = async (req) => {
  var query = `UPDATE actions SET status='Refusé' WHERE action_id='${req}'`;
  try {
    let action = await sql(query);
    return action;
  } catch (err) {
    console.log(err)
  }
}

// Database function to update status of action by ID  //
const validateActionById = async (req) => {
  var query = `UPDATE actions SET status='Validé' WHERE action_id='${req}'`;
  try {
    let action = await sql(query);
    return action;
  } catch (err) {
    console.log(err)
  }
}

// Database function to delete action by ID  //
const deleteActionById = async (req) => {
  var query = `DELETE from actions where action_id='${req}'`;
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
  updateActionById,
  validateActionById,
  denyActionById,
  deleteActionById,
}