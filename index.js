/* eslint-disable no-unused-vars */
//Main file for running the server

//Import modules
require('dotenv').config();
const express = require('express');
const createError = require('http-errors');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const xss = require('xss-clean');
const app = express();
const mainRouter = require('./src/routes/index');
const port = process.env.PORT;

//Use modules
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use('/', mainRouter);
app.use(helmet());
app.use(xss());

//Handle unknown routes
app.all('*', (req, res, next) => {
  next(new createError.NotFound());
});

//Error code and message
app.use((err, req, res, next) => {
  const messageError = err.message || "Internal server error";
  const statusCode = err.status || 500;

  res.status(statusCode).json({
    message : messageError
  })
})

//Start and listen to the specified port
app.listen(port, () => {
  console.log(`Website link : http://localhost:${port}`);
})