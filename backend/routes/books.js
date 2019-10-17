const POOL = require('../custom_modules/db-pool');

var express = require('express');
var router = express.Router();

const bookFilter = require('../custom_modules/book-filter');

//Have to execute the function in the body of the GET request
router.get('/', (req, res) => {
    console.log(req);
    //res.json(bookData);
    POOL.query('select * from books')
    .then(result => {
        res.json(result);
    })
    .catch(err => {
        console.log("Error getting book data: " + err);
    })
});

module.exports = router;