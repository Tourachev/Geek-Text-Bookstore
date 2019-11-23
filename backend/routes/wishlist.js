const queries = require('../custom_modules/list-transac');
var express = require('express');
var router = express.Router();

//body should be {userid: '', listnum: int}
router.post('/', (req, res) => {
    console.log(req.body);
    queries.getList(req.body, (err, result) => {
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

router.post('/mount', (req, res) => {
    console.log(req.body);
    queries.mount(req.body, (err, result) => {
        if (err) {
            console.log(err);
            res.json(null);
        } else {
            console.log(result);
            res.json(result);
        }
    })
});

router.post('/getNames', (req, res) => {
    console.log(req.body);
    queries.getNames(req.body, (err, result) => {
        if (err) {
            console.log(err);
            res.json(null);
        } else {
            console.log(result);
            res.json(result);
        }
    })
});

router.post('/toWish', (req, res) => {
    console.log(req.body);
    queries.toWish(req.body, (err, result) => {
        if (err) {
            console.log(err);
            res.json(null);
        } else {
            if (result == true) {
                res.json({decision: true});
            } else {
                res.json({decision: false});
            }
        }
    })
});

router.post('/remove', (req, res) => {
    console.log(req.body);
    queries.remove(req.body, (err, result) => {
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
    queries.toCart(req.body, (err, result) => {
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
    queries.rename(req.body, (err, result) => {
        if (err) {
            console.log(err);
            res.json({decision: false});
        } else {
            console.log(result);
            res.json({decision: true});
        }   
    })
});

router.post('/addToWish', (req, res) => {
    queries.addToWish(req.body, (err, result) => {
        if (err) {
            console.log(err);
            res.json(null);
        } else {
            console.log(result);
            res.json({decision: result});
        }   
    })
})


module.exports = router;
