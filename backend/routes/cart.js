const queries = require('../custom_modules/user-transac');
const CART_ADDED = 2; //New shipping address added
const CART_DELETED = 1; //shipping address removed
const NOT_UNIQUE = 1; //Duplicate address on insert
const QUERY_ERR = -1; //connection error in query

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
       if(err) {
           console.log(err);
           res.send(QUERY_ERR); // -1
       }
       else {
           if (result === CART_ADDED) {
               res.json ( {decision: CART_ADDED} );//2
           }
           else {
               res.json( {descision: NOT_UNIQUE} );//1
           }
       }
    });
})

router.post('/edit', (req, res) => {
    queries.editQuantity(req.body, (err, result) => {
        if (err) {
            console.log(
                'Error in /backend/routes/cart : ' +
                    'from editQuantity\n' +
                    err
            );
            res.json(null);
        } else {
            res.json({ decision: result }); //insert successful
        }
    });
});


router.post('/delete', (req, res) => {
    queries.delCartItems(req.body, (err) => {
        if (err) {
            console.log('Error in /backend/routes/cart: ' +
            'from remCartItems: ' + err);
            res.json( {decision: QUERY_ERR} ); //-1
        } else {
            console.log("Success");
            res.json( {decision: CART_DELETED} ); //1
        }
    });
});

module.exports = router;
