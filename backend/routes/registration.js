const POOL = require('../custom_modules/db-pool');
const register = require('../custom_modules/user-transac');

var express = require('express');
var router = express.Router();

//3 if authenticated
router.post('/', (req, res) => {
    register.createUser(req.body, (err, result) => {
        console.log(err);
        console.log(result);
        res.json({ "result": result });
    })
});

module.exports = router;