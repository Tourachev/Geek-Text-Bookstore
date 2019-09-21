const POOL = require('../custom_modules/db-pool');

var express = require('express');
var router = express.Router();

const bookFilter = require('../custom_modules/book-filter');

//Have to execute the function in the body of the GET request
router.get('/', function(req, res, next) {
    console.log(req);
    //res.json(bookData);
    bookFilter.byTitle(false, POOL, function(err, result, fields) {
        if (err) {
            console.log('Error :' + err);
        } else {
            res.json(result);
        }
    });
});

module.exports = router;