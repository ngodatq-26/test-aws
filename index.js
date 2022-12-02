const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const createError = require('http-errors');
const config = require('./src/config/Config.Env')
const route = require('./src/routes/Index.Router');
const port = config.APP_PORT;
const path = require('path');
const passportGoogle = require('./src/services/passport/Google.Passport');
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb',extended : true}));
app.use(express.static(`${__dirname}/src/resources/public`));
app.use(express.static(`${__dirname}/src/resources/uploads/files`));

app.set('views', `${__dirname}/src/resources/views`);
app.set('view engine', 'ejs');

app.use(cors());
//initialize major app
route(app);


app.get('/api/healthz', (req, res) => {
    return res.json({ status: 'ok' })
})

//404 handler and pass to error handler
app.use((req, res, next) => {
    res.status(404).render('404');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})