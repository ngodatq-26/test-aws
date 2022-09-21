const express = require('express');
const app = express();
const port = 3000;
const db = require('./src/config/Connect.Mongo');
const { User } = require('./src/models/User.Schema');

app.get('/', (req, res) => {
    console.log(db)
    res.send('Hello')
})

app.get('/test', async (req, res) => {
    await User.create({
        email: "datnq2@hocmai.vn",
        password: "12345678",
    })
    res.send('create successfully');
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})