const { sql } = require("../config/db");


// Database function to insert new file  //
const addFile = async (req) => {
  var query = `INSERT INTO files (action_id, user_id, file_name) values (${req.action}, ${req.user}, '${req.fileUpload}')`;
  try {
    let file = await sql(query);
    return file;
  } catch (err) {
    console.log(err)
  }
}

// Database function to retrieve file by action_id  //
const retrieveFile = async (action_id) => {
  var query = `SELECT * FROM files WHERE action_id ='${action_id}'`;
  try {
    let file = await sql(query);
    return file[0];
  } catch (err) {
    console.log(err)
  }
}


module.exports = {
  addFile,
  retrieveFile
}