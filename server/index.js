const express = require("express");
require('dotenv').config();
const usersRoute = require('./routes/users');
const actionsRoute = require('./routes/actions');
const doctorsRoute = require('./routes/doctors');
const localisationRoute = require('./routes/localisation');
const PORT = process.env.PORT || 5000;
const fileUpload = require('express-fileupload');
const path = require('path');
const _DIR = path.join(__dirname, 'public');
const app = express();
const flash = require('flash');
const session = require('express-session');

app.use(express.json());
// Middleware for files upload
app.use(fileUpload());
// Serve static files
app.use(express.static(_DIR));
// Session 
app.use(session({ cookie: { maxAge: 60000 }, 
  secret: 'waterfall',
  resave: false, 
  saveUninitialized: false}));
// parse urlencoded request bodies into req.body
app.use(express.urlencoded({ extended: true }));
app.use(flash());

// routes //
app.use('/auth', usersRoute);
app.use('/api/actions', actionsRoute);
app.use('/api/doctors', doctorsRoute);
app.use('/api/localisations', localisationRoute);

// Listen to node server on port 3001 //
app.listen(PORT, function () {
  console.log(`listening on port ${PORT}!`);
});