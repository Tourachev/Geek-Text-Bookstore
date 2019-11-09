const mariadb = require('mariadb');
const queries = require('../custom_modules/book-funct');
const pool = mariadb.createPool({
    host: 'virt-servers.mynetgear.com',
    port: 30000,
    user: 'team8',
    password: 'WehaveControl',
    database: 'geektext',
    connectionLimit: 2,
    dateStrings: 'date'
    //rowsAsArray: true
});

var express = require('express');
var router = express.Router();

//Have to execute the function in the body of the GET request
router.get('/', function(req, res, next) {
    console.log(req);
    //res.json(bookData);
    pool.query('select * from book')
        .then(result => {
            console.log(result);
            res.json(result);
        })
        .catch(err => {
            console.log(err);
        })
});

router.post('/getBook', (req, res) => {
    console.log(req.body)
    queries.getBook(req.body, (err, result) => {
        console.log("Getting the Book's Information");
        console.log(result);
        res.json({ result: result });
    });
});

router.post('/getAuthInfo', (req, res) => {
    console.log(req.body)
    queries.getAuthorInfo(req.body, (err, result) => {
        console.log("Getting the Author's Information");
        console.log(result);
        res.json({ result: result });
    });
});

module.exports = router;
