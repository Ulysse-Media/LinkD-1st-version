const { sql } = require("../config/db");


// Database function to insert new localisation  //
const addLocalisation = async (req) => {
  var query = `INSERT INTO localisation (localisation_name) values ('${req.localisation_name}')`;
  try {
    let localisation = await sql(query);
    return localisation;
  } catch(err) {
      console.log(err)
  }
}

// Database function to retrieve all localisations //
const getLocalisations = async () => {
  var query = `Select * from localisation`;
  try {
    let localisations = await sql(query);
    return localisations;
  } catch(err) {
      console.log(err)
  }
}

// Database function to retrieve all localisations //
const getLocalisationByUserId = async (user_id) => {
  var query = `Select * from localisation where user_id=${user_id}`;
  try {
    let localisations = await sql(query);
    return localisations;
  } catch(err) {
      console.log(err)
  }
}


module.exports = {
    addLocalisation,
    getLocalisations,
    getLocalisationByUserId
}