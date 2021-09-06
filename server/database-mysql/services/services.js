const { sql } = require("../config/db");


// Database function to insert new service  //
const addService = async (req) => {
    var query = `INSERT INTO services (service_name) values ('${req.service_name}')`;
    try {
        let service = await sql(query);
        return service;
    } catch (err) {
        console.log(err)
    }
}

// Database function to retrieve all services  //
const getServices = async () => {
    var query = `Select * from services`;
    try {
        let services = await sql(query);
        return services;
    } catch (err) {
        console.log(err)
    }
}

module.exports = {
    addService,
    getServices,
}