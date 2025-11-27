// create a new router
const express = require("express");
const router = express.Router();

// include bcrypt
const bcrypt = require('bcrypt');

// include express-validator
const {check, validationResult, body} = require('express-validator');

const redirectLogin = (req, res, next) => {
    if (!req.session.userId ) {
        res.redirect('./login') // redirect to the login page
    } else {
        next (); // move to the next middleware function
    } 
}

router.get('/register', function (req, res, next) {
    res.render('register.ejs')
});

router.post('/registered', [
    body('first').trim().escape(),
    body('last').trim().escape(),
    body('email').trim().isEmail() /* .normalizeEmail() - removed to allow example emails */, 
    body('username').trim().isLength({min: 4, max: 20}).withMessage('must be 5-20 characters long'),
    body('password').isLength({min: 5, max: 20}).withMessage('must be 8-24 characters long')
],
    // due to sanitising before storing in database, if the resulting name is too long for VARCHAR(50) error is thrown
    // to improve increase size of VARCHAR or change data type

function (req, res, next) {
    // saving data in database
    const saltRounds = 10;
    const plainPassword = req.body.password;
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        res.render('./register');
    } else {
        // bcrypt.hash() is an async func - so db.queury must be run inside it to store the hashed password
        bcrypt.hash(plainPassword, saltRounds, function(err, hashedPassword) { 
            // Store hashed password in your database.
            if(err) {
                next(err);
            }

            const sqlQuery = 'INSERT INTO users (first_name, last_name, email, username, hashed_password) VALUES (?,?,?,?,?)';
            const newRecord = [req.body.first, req.body.last, req.body.email, req.body.username, hashedPassword];

            db.query(sqlQuery, newRecord, (err, result) => {
                if(err) {
                    next(err)
                } else {
                    result = `hello ${req.body.first} ${req.body.last} you are now registered! we will send you an email at ${req.body.email}. 
                    your password is: ${req.body.password}, your hashed password is: ${hashedPassword}.`;
                    res.send(result)
                }
            });  
        })
    }                                                                
}); 

router.get('/list', redirectLogin, function (req, res, next) {
    let sqlQuery = `SELECT id, username, first_name, last_name FROM users`; // query database to get all books id, prcices and names
    // execute sql query
    db.query(sqlQuery, (err, result) => {
        if(err) {
            next(err)
        }
        res.render("userlist.ejs", {users: result})
    });
});

router.get('/login', function (req, res, next) {
    res.render('login.ejs')
});

router.post('/loggedin', [
    check('username').isLength({min: 4, max: 20}),
    check('password').isLength({min: 4, max: 50})
],
    function (req, res, next) {
    let username = req.body.username;
    let plainPassword = req.body.password;
    let sqlQuery = 'SELECT hashed_password FROM users WHERE username=?';

    let errors = validationResult(req);

    if(!errors.isEmpty()) {
        res.render('./login');
    } else {
        db.query(sqlQuery, [username], (err, rows) => {
            if(err) {
                next(err)
            } else {
                let userHash = rows[0].hashed_password;
            
                bcrypt.compare(plainPassword, userHash, function(err, result) {
                    if(err) {
                        next(err)
                    } else if(result == true) {
                        let sanitisedUsername = req.sanitize(username); 
                        // sanitise username before creating session and before displaying

                        req.session.userId = sanitisedUsername;
                        res.send(`hello ${sanitisedUsername}, your login was successful!`)
                    } else {
                        res.send(`the login credentials entered were incorrect, please try again or make an account on our registration page :)`)
                    }   
                })
            }
        })
    }  
});

// export the router object so index.js can access it
module.exports = router;