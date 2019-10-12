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
            res.json(null);
        } else {
            res.json(result);
        }
    });
});

//body should be {username: '', ccnum: Number, cvv: Number(3), 
//                name: '', zip: Number(5), expdate: ''}
router.post('/insert', (req, res) => {
    queries.addPaymentInfo(req.body, (err, result) => {
        if (err) {
            console.log('Error in /backend/routes/credit-info : ' + 
            'from addPaymentInfo\n' + err);
            res.json(null); 
        } else {
            res.json({decision: result}); //insert successful
        }
    });
});

//body should be {username: '', ccnum: Number}
router.post('/delete', (req, res) => {
    console.log(req.body);
    queries.delPaymentInfo(req.body, (err) => {
        if (err) {
            console.log('Error in /backend/routes/credit-info : ' + 
            'from remPaymentInfo: ' + err);
            res.json(null);
        } else {
            res.json({ decision: true }); //insert successful
        }
    });
});

module.exports = router;
