const express = require("express");
require('dotenv').config();
const usersRoute = require('./routes/users');
const actionsRoute = require('./routes/actions');
const doctorsRoute = require('./routes/doctors');
const localisationRoute = require('./routes/localisation');
const PORT = process.env.PORT || 5000;
const fileUpload = require('express-fileupload');
const path = require('path');
var _DIR = path.join(__dirname, 'public');
const app = express();

app.use(express.json());
// Middleware for files upload
app.use(fileUpload());
// Serve static files
app.use(express.static(_DIR));

// parse urlencoded request bodies into req.body
app.use(express.urlencoded({ extended: true }));

// routes //
app.use('/api/users', usersRoute);
app.use('/api/actions', actionsRoute);
app.use('/api/doctors', doctorsRoute);
app.use('/api/localisations', localisationRoute);

// Listen to node server on port 3001 //
app.listen(PORT, function () {
  console.log(`listening on port ${PORT}!`);
});