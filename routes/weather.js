var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('weather');
});

router.post('/result', function(req, res, next) {
    var city = req.body.city;
    console.log("Get city: " + city);
    res.end(city);
});

module.exports = router;
