const QUERY_ERR = -1;
const queries = require('../custom_modules/user-transac');
var express = require('express');
var router = express.Router();

//body should be {username: ''}
router.post('/', (req, res, next) => {
    queries.getPaymentInfo(req.body.username, (err, result) => {
        if (err) {
            console.log('Error in /backend/routes/credit-info : ' + 
            'from getPaymentInfo\n' + err);
            res.send(null);
        } else {
            res.json(result);
        }
    });
});

//body should be {username: '', ccnum: Number, cvv: Number(3), 
//                name: '', zip: Number(5), expdate: ''}
router.put('/insert', (req, res) => {
    queries.addPaymentInfo(req.body, (err, result) => {
        if (err) {
            console.log('Error in /backend/routes/credit-info : ' + 
            'from addPaymentInfo\n' + err);
            res.send(null); 
        } else {
            res.send(true); //insert successful
        }
    });
});

//body should be {username: '', ccnum: Number}
router.delete('/delete', (req, res) => {
    queries.delPaymentInfo(req.body, (err) => {
        if (err) {
            console.log('Error in /backend/routes/credit-info : ' + 
            'from remPaymentInfo: ' + err);
            res.send(null);
        } else {
            res.send(true); //insert successful
        }
    });
});

module.exports = router;
