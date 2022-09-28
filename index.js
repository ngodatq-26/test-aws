const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const createError = require('http-errors');
const config = require('./src/config/Config.Env')
const route = require('./src/routes/Index.Router');
const port = config.APP_PORT;

app.use(express.json());
app.use(express.urlencoded({ extended : true}));


//initialize major app
route(app);

//404 handler and pass to error handler
app.use((req, res, next) => {
    next(createError(404, 'Not found'));
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})