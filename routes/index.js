var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  res.setHeader('Access-Control-Allow-Origin', 'http://10.7.34.231:8089');
  res.send('aasss')
});

module.exports = router;
