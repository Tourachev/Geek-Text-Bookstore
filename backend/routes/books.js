var express = require('express');
var router = express.Router();

const bookFilter = require('../custom_modules/book-filter');
const mariadb = require('mariadb/callback');

const pool = mariadb.createPool({
    host: 'virt-servers.mynetgear.com',
    port: 30000,
    user: "team8",
    password: "WehaveControl",
    database: "GeekTextDB",
    connectionLimit: 2
    //rowsAsArray: true
});

//Have to execute the function in the body of the GET request
router.get('/', function(req, res, next) {
    console.log(req);
    //res.json(bookData);
    bookFilter.byTitle(false, pool, function(err, result, fields) {
        if (err) {
            console.log('Error :' + err);
        } else {
            res.json(result);
        }
    });
});

module.exports = router;
