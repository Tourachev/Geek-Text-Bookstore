const pool = require('../custom_modules/db-pool');

var express = require('express');
var router = express.Router();

router.post('/', (req, res, next) => {
    var query = 'select * from userinfo where userid=Mdamon';
    pool.query(query)
        .then(result => {
            console.log(result);
            res.json(result);
        })
        .catch(err => {
            console.log(err);
        });
});

// router.post('/', (req, res) => {
//     res.send('Add New Info');
// });

router.put('/:id', (req, res) => {
    res.send('Update info');
});

router.delete('/:id', (req, res) => {
    res.send('Delete info');
});

module.exports = router;
