const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const dbConnector = require('./config/dbConnector');

require("dotenv").config();

// parse incoming request body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}))

// connect DB instance
dbConnector.connectDB();

// mount routes
const routes = require('./routes');
app.use(routes);

// run the app
app.listen(process.env.PORT, console.log(`SERVER RUNNING ON PORT ${process.env.PORT}`));