const queries = require('../custom_modules/user-transac');

const CART_ADDED = 2; //New shipping address added
const CART_DELETED = 1; //shipping address removed
const NOT_UNIQUE = 1; //Duplicate address on insert
const QUERY_ERR = -1; //connection error in query

var express = require('express');
var router = express.Router();

router.post('/insert', (req, res) => {
    queries.addToSaveForLater(req.body, (err, result) => {
        if (err) {
            console.log(err);
            res.send(QUERY_ERR); // -1
        } else {
            if (result === CART_ADDED) {
                res.json({ decision: CART_ADDED }); //2
            } else {
                res.json({ descision: NOT_UNIQUE }); //1
            }
        }
    });
});
