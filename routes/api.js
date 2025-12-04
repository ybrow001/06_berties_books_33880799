const express = require("express");
const request = require('request');

const router = express.Router();

// handle routes

router.get('/search', function (req, res, next) {
    // query database to get all the books
    res.render('api.ejs');
});

router.get('/books', function (req, res, next) {
    // query database to get books

    let title = req.query.title;

    if(!title) {
        let sqlquery = "SELECT * FROM books"

        db.query(sqlquery, (err, result) => {
        // Return results as a JSON object
            if(err) {
                res.json(err);
                next(err)
            } else {
                res.json(result)
            }
        });
        return
    }

    title = title.trim();

    let sqlquery = "SELECT name, price FROM books WHERE name = ?";
    db.query(sqlquery, [title], (err, result) => {
        // return results as a JSON object
        if(err) {
            res.json(err);
            next(err)
        } else if(result.length === 0){
            let sqlquery = "SELECT * FROM books"

            db.query(sqlquery, (err2, allBooks) => {
                // Return results as a JSON object
                if(err) {
                    res.json(err2);
                    next(err2)
                } else {
                    res.json(allBooks)
                }
            })
        } else {
            res.json(result)
        }
    })
});

// export the router object so index.js can access it
module.exports = router;