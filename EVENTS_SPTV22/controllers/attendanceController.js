const { Attendance } = require('../models');
const generateCRUDControllers = require('./generateCRUDControllers');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require('dotenv').config();

const attendanceCRUDControllers = generateCRUDControllers(Attendance);

const attendanceController = {...attendanceCRUDControllers}



module.exports = attendanceController;