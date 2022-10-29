var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'e-commerce Los Pixies' });
  res.send("Pruebas")
});

module.exports = router;
