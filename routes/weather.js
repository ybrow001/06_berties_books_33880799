// create a new router
const express = require("express");
const request = require('request');

const router = express.Router();

// handle routes
router.get('/',function(req, res, next){
    let apiKey = 'a89f7bf91eb5ad9393be9dabf1c50955'; // possibly turn into user input and hash to hide
    let city = 'london';
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    request(url, function(err, response, body) {
        if(err){
            next(err)
        } else {
            var weather = JSON.parse(body);
            var location = "london";
            res.render('weather.ejs', {weather: weather, location: location});
            // res.send(body)
        }
    });
});

router.get('/search', function(req, res, next){
    res.render('weather.ejs', {weather: null, location: null});
});

router.get('/result', function(req, res, next){ // add styling !!
    let apiKey = 'a89f7bf91eb5ad9393be9dabf1c50955'; // possibly turn into user input and hash to hide
    let city = req.query.city;
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    request(url, function(err, response, body) {
        if(err) {
            next(err)
        } else if(JSON.parse(body).cod != "200") { 
            // to check if api request failed - prevent app crashing from reference error
            res.send("sorry, your forecast could not be retrieved :(");
        } else {
            var weather = JSON.parse(body);
            var location = "global";
            res.render('weather.ejs', {weather: weather, location: location});
        }
    });
});

// Export the router object so index.js can access it
module.exports = router;