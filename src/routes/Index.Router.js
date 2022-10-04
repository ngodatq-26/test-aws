const express = require('express');
const app = express();

//get all define routes
const AuthRoute = require('./Auth.Router');
const UserRoute = require('./User.Router');
const OAuth2Route = require('./OAuth2.Router');
const DinnerRoute = require('./Dinner.Router');

function route(app) {
    app.use('/api/auth', AuthRoute);
    app.use('/api/user', UserRoute);
    app.use('/api/oauth2', OAuth2Route);
    app.use('/api/dinner', DinnerRoute);
}

module.exports = route;