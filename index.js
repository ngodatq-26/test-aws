const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const createError = require('http-errors');
const config = require('./src/config/Config.Env')

const port = config.APP_PORT;

app.use(express.json());
app.use(express.urlencoded({ extended : true}));

//define all router
const AuthRoute = require('./src/routes/Auth.Router');
const UserRoute = require('./src/routes/User.Router');


//initialize major app
app.use('/auth', AuthRoute);
app.use('/user', UserRoute);

//404 handler and pass to error handler
app.use((req, res, next) => {
    next(createError(404, 'Not found'));
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})