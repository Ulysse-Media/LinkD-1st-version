const { sql } = require("../config/db");
var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);

const signupClient = async (req) => {
    var alert = "";
    var hash = bcrypt.hashSync(req.user_password, salt);
    var query = `INSERT INTO users (user_email, user_password) values ('${req.user_email}','${hash}')`;
    try {
        let users = await sql(query);
        return users;
    } catch (err) {
        if(err.code === "ER_DUP_ENTRY") {
            alert = "This adress email is already used please try another email";
            return {alert};
        } else {
            console.log(err);
        }
    }
}

const loginClient = async (req) => {
    var assignedPassword = null;
    var alert = "";
    var query = `SELECT * FROM users WHERE user_email='${req.user_email}'`;
    try {
        let user = await sql(query);
        if (user.length) {
            assignedPassword = user[0].user_password;
            if(bcrypt.compareSync(req.user_password, assignedPassword)) {
                return user;
            } else {
                alert = "Please verify your password";
                return {alert};
            }      
        } else {
            alert = "Please verify your email adress";
            return {alert};
        }
    } catch (err) {
        console.log(err)
    }
}

const getClients = async () => {
    var query = `Select * from users`;
    try {
        let users = await sql(query);
        return users;
    } catch (err) {
        console.log(err)
    }
}

const getClient = async (req) => {
    var query = `Select * from users where user_id='${req}'`;
    try {
        let user = await sql(query);
        return user;
    } catch (err) {
        console.log(err)
    }
}

module.exports = {
    signupClient,
    loginClient,
    getClients,
    getClient,
}