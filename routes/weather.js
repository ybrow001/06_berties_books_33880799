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
            var weather = JSON.parse(body)
            var wmsg = `it is ${weather.main.temp} degrees in ${weather.name} 
            and the humidity is ${weather.main.humidity}!`;
            res.send (wmsg);
            // res.send(body)
        }
    });
});

router.get('/search', function(req, res, next){
    res.render('weather.ejs');
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
            var wmsg = `it is ${weather.main.temp} degrees in ${weather.name} and the humidity is ${weather.main.humidity}! 
            <br> 
            the weather type is ${weather.weather[0].main}, it can be described as ${weather.weather[0].description}.`;
            res.send(wmsg);
        }
    });
});

// Export the router object so index.js can access it
module.exports = router;