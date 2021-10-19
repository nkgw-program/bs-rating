const express = require('express');
const bodyParser = require('body-parser')
const session = require('express-session');
const router = express.Router();
const request = require('request');
const app = express();
const path = require('path');
var zaif = require('zaif.jp');
var zaifApi = zaif.PublicApi;
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

//板情報の取得
app.get('/zaif/depth', (req, res) => {
  
  //通貨ペアの取得(オプション)
  const option = {
    url: 'https://api.zaif.jp/api/1/currency_pairs/all',
    method: 'GET',
    json: true
  }

  //通貨ペアの取得(API呼び出し)
  request(option, function (error, response, body) {
    
    //通貨ペアの配列化
    const pairs = JSON.parse(JSON.stringify(body));

    const allDepth = [];
    pairs.forEach(pair => {
      const temp = zaifApi.depth(pair.currency_pair)
      allDepth.push(temp);
    });
    res.send(JSON.parse(JSON.stringify(allDepth)));
  });
});

app.listen(port);