const express = require('express');
const bodyParser = require('body-parser')
const session = require('express-session');
const request = require('request');
const app = express();
const path = require('path');
const port = 4000;

//for zaif api
var zaif = require('zaif.jp');
var api = zaif.PublicApi;

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

/* Hello World */
app.get('/', (req, res) => res.send('Hello World'));



/*--------- zaif API ---------*/

const url_zaif = 'https://api.zaif.jp/api/1/';

//通過情報の取得
app.get('/zaif', (req, res) => {
  const url = url_zaif + 'currencies/all';
    request.get({
      uri : url,
      headders : {'content-type' : 'application/json'},
      qs : {
      },
      json : true
    }), function(err, req, data){
      res.send(data);
    }
});

app.listen(port);