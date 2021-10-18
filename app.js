const express = require('express');
const bodyParser = require('body-parser')
const session = require('express-session');
const router = express.Router();
const request = require('request');
const app = express();
const path = require('path');
const { get } = require('request');
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


/* Hello World */
app.get('/', (req, res) => {
  res.send("hello world");
});



/*--------- zaif API ---------*/

//通過情報の取得
app.get('/zaif/depth', (req, res) => {
  
  const option = {
    url: 'https://api.zaif.jp/api/1/depth/btc_jpy',
    method: 'GET',
    json: true
  }

  request(option, function (error, response, body) {
    res.send(body);
  });
});

app.listen(port);