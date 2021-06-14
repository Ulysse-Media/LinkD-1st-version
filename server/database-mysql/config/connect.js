var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'yass94683607',
    database: 'linkD'
});


module.exports = {
    connection
};