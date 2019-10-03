const POOL = require('../custom_modules/db-pool');

var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    console.log('hey');
    res.send('Get logged in user');
});

router.post('/', (req, res) => {
    res.send('Log in');
});

module.exports = router;
