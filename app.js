const express = require('express');
const bodyParser = require('body-parser');

// database
const db = require('./db/db');

// user routes
const userRouter = require('./routes/userRoutes');

const app = express();

app.use(express.json());

// user routes
app.use('/users', userRouter);

module.exports = app;
