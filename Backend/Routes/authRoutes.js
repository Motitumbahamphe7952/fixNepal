const Router = require('express').Router();
const authController = require("../Controllers/authController")

Router.post('/register', authController.register);
Router.post('/login', authController.login);   
Router.get('/logout', authController.logout);

module.exports = Router;