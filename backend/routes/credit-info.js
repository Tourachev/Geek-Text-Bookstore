const POOL = require('../custom_modules/db-pool');

var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    findCreditlInfo(POOL, function(err, result, fields) {
        if (err) {
            console.log('Error :' + err);
        } else {
            res.json(result);
        }
    });
});

function findPersonalInfo(pool, callback) {
    var findCreditlInfo = 'SELECT * FROM Book ORDER BY title ' + sortType;

    pool.query(findCreditlInfo, (err, res, fields) => {
        if (err) {
            callback(err, null, null);
        } else {
            callback(null, res, fields);
        }
    });
}

module.exports = router;
