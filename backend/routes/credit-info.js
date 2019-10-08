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

// router.get('/', function(req, res, next) {
//     findCreditlInfo(POOL, function(err, result, fields) {
//         if (err) {
//             console.log('Error :' + err);
//         } else {
//             res.json(result);
//         }
//     });
// });

router.post('/', (req, res, next) => {
    var query = 'select * from paymentinfo where userid=?';
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

router.delete('/:id', (req, res) => {
    res.send('Delete info');
});

module.exports = router;
