const { sql } = require("../config/db");


// Database function to insert new action  //
const addAction = async (req) => {
  var query = `INSERT INTO actions (action_type, other_stuff, start_action, end_action, schedule, action_town, action_location, other_location, product, speaker, speaker_suggestion, speaker_transfer, speaker_accommodation, meeting_agenda, meeting_theme, pax_number, action_field, invited_doctors, other_doctors, comments) values ('${req.action_type}', '${req.other_stuff}', '${req.start_action}', '${req.end_action}', '${req.schedule}', '${req.action_town}', '${req.action_location}', '${req.other_location}', '${req.product}', '${req.speaker}', '${req.speaker_suggestion || null}', '${req.speaker_transfer || 0}', '${req.speaker_accommodation || 0}', '${req.meeting_agenda || null}', '${req.meeting_theme}', '${req.pax_number}', '${req.action_field}', '${req.invited_doctors}', '${req.other_doctors}', '${req.comments}')`;
  try {
    let actions = await sql(query);
    return actions;
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