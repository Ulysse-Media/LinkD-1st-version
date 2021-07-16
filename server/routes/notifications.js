const express = require('express');
const router = express.Router();
const Actions = require("../database-mysql/actions/actions");
const STATIC_CHANNELS = ['global_notif', 'global_chats'];


