const gameController = require('./src/controllers/game.controller');
const apiError = require('./src/models/apierror.model');
const gameroutes = require('./src/routes/game.routes');

const express = require('express');
const bodyParser = require('body-parser');
const morgan =  require('morgan');
var app = express();

const expressPort = process.env.PORT || 3000;

app.use(morgan('dev'));
app.use(bodyParser.json());

//Regular routing
app.use('/api', gameroutes);

//Handler non existent routes
app.use('*', (req, res, next) =>{ 
  next(new apiError('Non existing endpoint', '404'))
});

//Handler for errors
app.use("*", (err, req, res, next) =>{
  
  //For some reason, next doesn't pass the err object.
  console.log('YEAG' + err.errorName);
  res.status(err.errorStatus >= 100 && err.errorStatus < 600 ? err.errorStatus : 500).json(err).end();
});

app.listen(expressPort, () => console.log(`Example app listening on ${expressPort}`));

module.exports = app