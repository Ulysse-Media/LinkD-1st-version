const { sql } = require("../config/db");


// Database function to insert new action  //
const addAction = async (req) => {
  var values = req
  var query = `INSERT INTO actions (action_type, other_stuff, start_action, end_action, schedule, action_town, action_location, other_location, product, speaker, speaker_suggestion, speaker_transfer, speaker_accommodation, meeting_agenda, meeting_theme, pax_number, action_field, invited_doctors, other_doctors, comments) values ('${values.action_type}', '${values.other_stuff}', '${values.start_action}', '${values.end_action}', '${values.schedule}', '${values.action_town}', '${values.action_location}', '${values.other_location}', '${values.product}', '${values.speaker}', '${values.speaker_suggestion || null}', '${values.speaker_transfer || 0}', '${values.speaker_accommodation || 0}', '${values.meeting_agenda || null}', '${values.meeting_theme}', '${values.pax_number}', '${values.action_field}', '${values.invited_doctors}', '${values.other_doctors}', '${values.comments}')`;
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

// Database function to update action by ID  //
const updateActionById = async (req) => {
  console.log("db req", req)
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
  } catch(err) {
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
  getLastAction,
  updateActionById,
  deleteActionById
}