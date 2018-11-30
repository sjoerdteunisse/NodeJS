const gameController = require('./src/controllers/game.controller');
const apiError = require('./src/models/apierror.model');
const gameroutes = require('./src/routes/game.routes');

const express = require('express');
const bodyParser = require('body-parser');
const morgan =  require('morgan');
var app = express();

const expressPort = 3000;

app.use(morgan('dev'));
app.use(bodyParser.json());

//Regular routing
app.use('/api', gameroutes);

//Handler voor niet bestaande routes
app.use('*', (req, res, next) =>{ 
  next(new apiError('Non existing endpoint', '404'))
});

//Handler for errors
app.use("*", (err, req, res, next) =>{
  res.status(err.errorStatus).json(err);
});

app.listen(expressPort, () => console.log(`Example app listening on ${expressPort}`));