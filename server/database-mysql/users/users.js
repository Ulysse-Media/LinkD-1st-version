const { sql } = require("../config/db");


const signupClient = async (credientials) => {
    var query = `INSERT INTO users (username, email) values ('${credientials.username}','${credientials.email}')`;
    try {
      let users = await sql(query);
      return users;
    } catch(err) {
        console.log(err)
    }
}

const getClients = async () => {
    var query = `Select * from users`;
    try {
        let users = await sql(query);
        return users;
    } catch(err) {
        console.log(err)
    }
}

const getClient = async (email) => {
    var query = `Select * from users where email='${email}'`;
    try {
        let users = await sql(query);
        return users;
    } catch(err) {
        console.log(err)
    }
}




module.exports = {
    signupClient,
    getClients,
    getClient
  }