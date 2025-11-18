// Create a new router
const { name } = require("ejs");
const express = require("express")
const router = express.Router()

router.get('/search',function(req, res, next){
    res.render("search.ejs", {searchResult: null})
});

router.get('/search-result', function (req, res, next) {
    let sqlQuery = `SELECT id, price, name FROM books`; // query database to get all books id, prcices and names
    // execute sql query
    db.query(sqlQuery, (err, result) => {
        if (err) {
            next(err)
        }
        res.render("search.ejs", {books: result, searchResult: req.query.search})
    });

    //searching in the database
    // res.send("You searched for: " + req.query.search)
});

router.get('/list', function(req, res, next) {
    let sqlQuery = `SELECT id, price, name FROM books`; // query database to get all books id, prcices and names
    // execute sql query
    db.query(sqlQuery, (err, result) => {
        if (err) {
            next(err)
        }
        res.render("list.ejs", {availableBooks: result})
    });
});

router.get('/addbook',function(req, res, next){
    res.render("addbook.ejs")
});

router.post('/bookadded', function (req, res, next) {
    // saving data in database
    let sqlQuery = "INSERT INTO books (name, price) VALUES (?,?)"
    // execute sql query
    let newRecord = [req.body.name, req.body.price]
    db.query(sqlQuery, newRecord, (err, result) => {
        if (err) {
            next(err)
        }
        else {
            res.send(`This book has been added to database - name: ${req.body.name}, price: £${req.body.price}`)
        }
    })
});

router.get('/bargainbooks',function(req, res, next){
    let sqlQuery = `SELECT id, price, name FROM books`; // query database to get all books id, prcices and names
    // execute sql query
    db.query(sqlQuery, (err, result) => {
        if (err) {
            next(err)
        }
        res.render("bargains.ejs", {bargainBooks: result})
    });
});

// Export the router object so index.js can access it
module.exports = router