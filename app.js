const express = require('express');
const bodyParser = require('body-parser')
const session = require('express-session');
const app = express();
const port = 4000;

app.use(bodyParser.urlencoded({ extended: true }));


const allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
  res.header(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization, access_token'
  )

  // intercept OPTIONS method
  if ('OPTIONS' === req.method) {
    res.send(200)
  } else {
    next()
  }
}
app.use(allowCrossDomain)

