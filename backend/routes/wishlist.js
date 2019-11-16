const queries = require('../custom_modules/list-transac');
var express = require('express');
var router = express.Router();

//body should be {userid: '', listnum: int}
router.post('/', (req, res) => {
    console.log(req.body);
    queries.getWishLists(req.body, (err, result) => {
        if (err) {
            console.log('Error getting wishlist');
            console.log(err);
            res.json(null);
        } else {
            console.log(result);
            res.json(result);
        }
    });
});


module.exports = router;
