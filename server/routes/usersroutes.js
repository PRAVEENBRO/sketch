const express = require('express');
const userRoutes = express.Router();
const { signup, signin, logout } = require('../controller/userController')

userRoutes.post('/signup', signup);
userRoutes.post('/signin', signin);
userRoutes.get('/logout', logout);

module.exports = userRoutes;