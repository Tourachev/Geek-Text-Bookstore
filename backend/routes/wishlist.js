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

router.post('/toWish', (req, res) => {
    console.log(req.body);
    queries.wishToWish(req.body, (err, result) => {
        if (err) {
            console.log(err);
            res.json({decision: false});
        } else {
            console.log(result);
            res.json({decision: true});
        }
    })
});

router.post('/remove', (req, res) => {
    console.log(req.body);
    queries.removeFromWish(req.body, (err, result) => {
        if (err) {
            console.log(err);
            res.json({decision: false});
        } else {
            console.log(result);
            res.json({decision: true});
        }   
    })
});

router.post('/toCart', (req, res) => {
    console.log(req.body);
    queries.wishToWish(req.body, (err, result) => {
        if (err) {
            console.log(err);
            res.json({decision: false});
        } else {
            console.log(result);
            res.json({decision: true});
        }
    })
});

router.post('/rename', (req, res) => {
    console.log(req.body);
    queries.nameList(req.body, (err, result) => {
        if (err) {
            console.log(err);
            res.json({decision: false});
        } else {
            console.log(result);
            res.json({decision: true});
        }   
    })
});


module.exports = router;
