const { sql } = require("../config/db");


// Database function to insert new agency  //
const addAgency = async (req) => {
    var query = `INSERT INTO agencies (agency_name, agency_email) values ('${req.agency_name}', '${req.agency_email}')`;
    try {
        let agency = await sql(query);
        return agency;
    } catch (err) {
        console.log(err)
    }
}

// Database function to retrieve all agencies  //
const getAgencies = async () => {
    var query = `Select * from agencies`;
    try {
        let agencies = await sql(query);
        return agencies;
    } catch (err) {
        console.log(err)
    }
}

module.exports = {
    addAgency,
    getAgencies,
}