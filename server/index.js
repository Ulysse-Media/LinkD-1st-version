const express = require("express");
require('dotenv').config();
const usersRoute = require('./routes/users');
const actionsRoute = require('./routes/actions');
const doctorsRoute = require('./routes/doctors');
const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());

// parse urlencoded request bodies into req.body
app.use(express.urlencoded({
  extended: true
}));

// routes //
app.use('/api/users', usersRoute);
app.use('/api/actions', actionsRoute);
app.use('/api/doctors', doctorsRoute);

// Listen to node server on port 3000 //
app.listen(PORT, function () {
  console.log(`listening on port ${PORT}!`);
});