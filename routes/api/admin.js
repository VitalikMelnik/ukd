const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const generator = require('generate-password');
const passport = require('passport');


// Load User model
const User = require('../../models/User');
const Post = require('../../models/Post');




module.exports = router;