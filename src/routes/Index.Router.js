const express = require('express');
const app = express();

//get all define routes
const AuthRoute = require('./Auth.Router');
const UserRoute = require('./User.Router');

function route(app) {
    app.use('/api/auth', AuthRoute);
    app.use('/api/user', UserRoute);
}

module.exports = route;