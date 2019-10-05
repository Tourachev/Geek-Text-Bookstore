const POOL = require('../custom_modules/db-pool');
const log = require('../custom_modules/user-transac');

var express = require('express');
var router = express.Router();

//3if authenticated
router.post('/', (req, res) => {
    log.login(req.body, (err, username, result) => {
        console.log(username);
        res.json({ result: result });
    });
});

module.exports = router;
