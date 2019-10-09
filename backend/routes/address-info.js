const mariadb = require('mariadb');
const pool = mariadb.createPool({
    host: 'virt-servers.mynetgear.com',
    port: 30000,
    user: 'team8',
    password: 'WehaveControl',
    database: 'GeekTextDB',
    connectionLimit: 2,
    dateStrings: 'date'
    //rowsAsArray: true
});

var express = require('express');
var router = express.Router();

router.post('/', (req, res, next) => {
    var query = 'select * from shipaddresses where userid=?';
    pool.query(query, [req.body.username])
        .then(result => {
            res.json(result);
        })
        .catch(err => {
            console.log(err);
        });
});

router.put('/:id', (req, res) => {
    res.send('Update info');
});

router.post('/delete', (req, res) => {
    console.log(req.body.address);
    var query = 'DELETE FROM shipaddresses where address=?';
    pool.query(query, toString([req.body.address]));
});

module.exports = router;
