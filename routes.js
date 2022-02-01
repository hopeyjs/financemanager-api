const express = require('express');
const app = express();

// import controllers
const AuthController = require('./controllers/auth.controller');

// import middlewares

// check api status
app.get('/api', (req, res) => {
    return res.send("server is up and running");
})

// auth routes
app.post('/user/create', AuthController.createUser);
app.post('/user/passwordreset/', AuthController.getSecurityQuestion);
app.patch('/user/passwordreset/:id', AuthController.resetPassword);
app.patch('/user/updatesecuritydetails/:id', AuthController.updateSecurityDetails);
app.post('/login', AuthController.login);
app.post('/logout', AuthController.logout);


module.exports = app