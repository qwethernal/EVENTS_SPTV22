const { Category } = require('../models');
const generateCRUDControllers = require('./generateCRUDControllers');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require('dotenv').config();

const categoryCRUDControllers = generateCRUDControllers(Category);

const categoryController = {...categoryCRUDControllers}



module.exports = categoryController;