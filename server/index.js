const express = require("express");
require('dotenv').config();
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http, {
  cors: {
    origin: "http://localhost:3001",
    methods: ["GET", "POST", "DELETE", "UPDATE"]
  }
});
const usersRoute = require('./routes/users');
const actionsRoute = require('./routes/actions');
const doctorsRoute = require('./routes/doctors');
const actionsUserRoute = require('./routes/actionsUser');
const localisationRoute = require('./routes/localisation');
const PORT = process.env.PORT || 5000;
const fileUpload = require('express-fileupload');
const Actions = require("./database-mysql/actions/actions");
const path = require('path');
const _DIR = path.join(__dirname, 'public');
const flash = require('flash');
const session = require('express-session');
const cors = require("cors");
let interval;

const getApiAndEmit = () => {
  // Api to retrieve all actions
  app.get('/', function (req, res, next) {
    console.log("here")
    let interval;
    Actions.getActions().then(result => {
      try {
        // Emitting a new message. Will be consumed by the client
        io.emit("FromAPI", result);
        return res.json(result);
      } catch (err) {
        console.log(err)
      }
    })
  });
};
io.on("connection", (socket) => {
  console.log("New client connected");
  if (interval) {
    clearInterval(interval);
  }
  setInterval(() => { })
  interval = setInterval(() => getApiAndEmit(socket), 1000);
  socket.on("disconnect", () => {
    console.log("Client disconnected");
    clearInterval(interval);
  });
});



app.use(express.json());

// Middleware for files upload
app.use(fileUpload());
app.set('socketio', io)
// Serve static files
app.use(express.static(_DIR));
app.use(cors());

// Session 
app.use(session({
  cookie: { maxAge: 60000 },
  secret: 'waterfall',
  resave: false,
  saveUninitialized: false
}));

// parse urlencoded request bodies into req.body
app.use(express.urlencoded({ extended: true }));
app.use(flash());

// routes //
app.use('/auth', usersRoute);
app.use('/api/actions', actionsRoute);
app.use('/api/actions/user', actionsUserRoute);
app.use('/api/doctors', doctorsRoute);
app.use('/api/localisations', localisationRoute);
// app.use('/api/notifications', notificationsRoute);

// Listen to node server on port 3001 //
http.listen(PORT, function () {
  console.log(`listening on port ${PORT}!`);
});



