const POOL = require('../custom_modules/db-pool');

var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    // findPersonalInfo(POOL, function(err, result, fields) {
    //     if (err) {
    //         console.log('Error :' + err);
    //     } else {
    //         res.json(result);
    //     }
    // });
});

router.post('/', (req, res) => {
    res.send('Add New Info');
});

router.put('/:id', (req, res) => {
    res.send('Update info');
});

router.delete('/:id', (req, res) => {
    res.send('Delete info');
});

function findPersonalInfo(pool, callback) {
    var findPersonalInfo = 'SELECT * FROM Book ORDER BY title ';

    pool.query(findPersonalInfo, (err, res, fields) => {
        if (err) {
            callback(err, null, null);
        } else {
            callback(null, res, fields);
        }
    });
}

module.exports = router;
