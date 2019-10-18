const mariadb = require('mariadb');
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

module.exports = router;