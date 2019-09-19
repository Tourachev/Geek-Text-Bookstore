var express = require('express');
var router = express.Router();

const bookFilter = require('../book-filter');
const mariadb = require('mariadb/callback');

const pool = mariadb.createPool({
    host: 'virt-servers.mynetgear.com',
    port: 30000,
<<<<<<< HEAD
    user: "team8",
    password: "WehaveControl",
    database: "GeekTextDB",
    connectionLimit: 2
=======
    user: 'team8',
    password: 'WehaveControl',
    database: 'GeekTextDB',
    connections: 2
>>>>>>> 79163fb3998aeaa80ba46713c9029c24f10e67c7
    //rowsAsArray: true
});

//Have to execute the function in the body of the GET request
router.get('/', function(req, res, next) {
    console.log('hey');
    //res.json(bookData);
<<<<<<< HEAD
    bookFilter.byTitle(true, pool, function(err, result, fields){
        if (err){
=======
    bookFilter.byTitle(false, pool, function(err, result, fields) {
        if (err) {
>>>>>>> 79163fb3998aeaa80ba46713c9029c24f10e67c7
            console.log('Error :' + err);
        } else {
            res.json(result);
        }
    });
});

module.exports = router;
