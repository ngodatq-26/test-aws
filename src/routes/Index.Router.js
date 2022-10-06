const express = require('express');
const app = express();

//get all define routes
const AuthRoute = require('./Auth.Router');
const UserRoute = require('./User.Router');
const OAuth2Route = require('./OAuth2.Router');
const RecipeRoute = require('./Recipe.Router');
const DinnerRoute = require('./Dinner.Router');
const BookRoute = require('./Book.Router');

function route(app) {
    app.use('/api/auth', AuthRoute);
    app.use('/api/user', UserRoute);
    app.use('/api/oauth2', OAuth2Route);
    app.use('/api/recipe', RecipeRoute);
    app.use('/api/dinner', DinnerRoute);
    app.use('/api/book', BookRoute);
}

module.exports = route;