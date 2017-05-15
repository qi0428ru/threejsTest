var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
   //res.send('hello world')
   res.render('chapter07/index');
});

module.exports = router;