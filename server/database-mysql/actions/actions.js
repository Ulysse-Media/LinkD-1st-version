const { sql } = require("../config/db");


// Database function to insert new action  //
const addAction = async (req) => {
  console.log("request",req)
  var values = req
  var query = `INSERT INTO actions (action_type, other_stuff, start_action, end_action, schedule, action_town, action_location, other_location, product, speaker, speaker_suggestion, speaker_transfer, speaker_accommodation, meeting_agenda, meeting_theme, pax_number, action_field, invited_doctors, other_doctors, comments) values ('${values.action_type}', '${values.other_stuff}', '${values.start_action}', '${values.end_action}', '${values.schedule}', '${values.action_town}', '${values.action_location}', '${values.other_location}', '${values.product}', '${values.speaker}', '${values.speaker_suggestion || null}', '${values.speaker_transfer || 0}', '${values.speaker_accommodation || 0}', '${values.meeting_agenda || null}', '${values.meeting_theme}', '${values.pax_number}', '${values.action_field}', '${values.invited_doctors}', '${values.other_doctors}', '${values.comments}')`;
  try {
    let action = await sql(query);
    return action;
  } catch(err) {
      console.log(err)
  }
}

// Database function to retrieve all actions  //
const getActions = async () => {
  var query = `Select * from actions`;
  try {
    let actions = await sql(query);
    return actions;
  } catch(err) {
      console.log(err)
  }
}

// Database function to retrieve all actions  //
const getLastAction = async () => {
  var query = `SELECT * FROM actions ORDER BY action_id DESC LIMIT 1`;
  try {
    let actions = await sql(query);
    return actions;
  } catch(err) {
      console.log(err)
  }
}

// Database function to retrieve action by ID  //
const getActionById = async (req) => {
  var query = `Select * from actions where action_id='${req.action_id}'`;
  try {
    let actions = await sql(query);
    return actions;
  } catch(err) {
      console.log(err)
  }
}


module.exports = {
  addAction,
  getActions,
  getActionById,
  getLastAction,
}