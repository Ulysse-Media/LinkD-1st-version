var mysql = require('mysql');

// MySQL connection database
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'linkd',
});


module.exports = {
    connection
};