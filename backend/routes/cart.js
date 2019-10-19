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

router.post('/insert', (req, res) => {
    queries.addToCart(req.body, (err, result) => {
        if (err) {
            console.log(
                'Error in /backend/routes/credit-info : ' +
                    'from addPaymentInfo\n' +
                    err
            );
            res.json(null);
        } else {
            res.json({ decision: result }); //insert successful
        }
    });
});

module.exports = router;
