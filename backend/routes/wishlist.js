const queries = require('../custom_modules/user-transac');
var express = require('express');
var router = express.Router();

//body should be {username: ''}
router.post('/', (req, res, next) => {
    queries.getWishlistInfo(req.body.username, (err, result) => {
        if (err) {
            console.log(
                'Error in /backend/routes/credit-info : ' +
                    'from getWishlistInfo\n' +
                    err
            );
            res.json(null);
        } else {
            res.json(result);
        }
    });
});
