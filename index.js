const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const app = express()

const { mongoUrl } = require('./key')


app.use(function (req, res, next) {
    req.payload = {};
    next();
});

app.use(bodyParser.json())
app.use(require("./src/routes/index"));

mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.connection.on('connected', () => {
    console.log("connected to mongo db finally")
})

mongoose.connection.on('error', (err) => {
    console.log("This is error", err)
})

const PORT = process.env.PORT || 1000

app.listen(PORT, () => {
    console.log("Server Running " + PORT)
})