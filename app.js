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


/*          　_  __   */
/* 　______ _(_)/ _|  */
/*  |_  / _` | | |_   */
/* 　/ / (_| | |  _|  */
/*  /___\__,_|_|_|    */

/* --zaif API 板情報の取得-- */
app.get('/zaif/depth', (req, res) => {

  //返り値
  const depth = [];

  //すべての通貨ペアに対して
  zaifApi.currency_pairs("all").then(pairs => {

    //配列の最終要素の検知
    let index = 0;

    pairs.forEach(pair => {
      //一つ一つの板情報の取得
      zaifApi.depth(pair.currency_pair).then(value => {
        index++;
        depth.push(value);
        if(index === pairs.length){
          res.send(depth);
        }
      });
    });
  });
});

/* --zaif API 終値の取得-- */
app.get('/zaif/last_price', (req, res) => {

  //返り値
  const last_price = [];

  //すべての通貨ペアに対して
  zaifApi.currency_pairs("all").then(pairs => {

    //配列の最終要素の検知
    let index = 0;

    pairs.forEach(pair => {
      //一つ一つの終値の取得
      zaifApi.lastPrice(pair.currency_pair).then(value => {
        index++;
        last_price.push(value);
        if(index === pairs.length){
          res.send(last_price);
        }
      });
    });
  });
});



app.listen(port);