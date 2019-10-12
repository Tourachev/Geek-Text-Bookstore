const queries = require('../custom_modules/user-transac');
const ADDR_ADDED = 2; //New shipping address added
const ADDR_DELETED = 1; //shipping address removed
const NOT_UNIQUE = 1; //Duplicate address on insert
const QUERY_ERR = -1; //connection error in query
var express = require('express');
var router = express.Router();

//retrieve users addresses
router.post('/', (req, res) => {
    queries.getAddresses(req.body.username, (err, result) => {
        if (err) {
            res.send(null); //error with query
        } else {
            res.json(result); //send personal info
        }
    });
});

//body should be {username: '', state: '', city: '', address: '', zip: int(5)}
router.post('/insert', (req, res) => {
    queries.addAddress(req.body, (err, result) => {
        if (err) {
            console.log(err);
            res.send(QUERY_ERR); //-1
        } else {
            if (result === ADDR_ADDED) {
                res.send(ADDR_ADDED); //2
            } else {
                res.send(NOT_UNIQUE); //1
            }
        }
    });
});

//body should be {username: '', state: '', city: '', address: '', zip: int(5)}
router.post('/delete', (req, res) => {
    queries.delAddress(req.body, (err) => {
        if (err) {
            console.log('Error in /backend/routes/address_info: ' +
            'from remShippingAddress: ' + err);
            res.send(QUERY_ERR); //-1
        } else {
            res.send(ADDR_DELETED); //1
        }
    });
});

module.exports = router;
