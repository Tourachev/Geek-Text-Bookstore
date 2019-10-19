const queries = require('../custom_modules/user-transac');

var express = require('express');
var router = express.Router();

//
router.post('/', (req, res) => {
    console.log(req.body);
    queries.getCart(req.body, (err, result) => {
        console.log('here we are');
        console.log(result);
        res.json({ result: result });
    });
});

module.exports = router;