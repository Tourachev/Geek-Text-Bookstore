const queries = require('../custom_modules/comment_queries');
const NOT_UNIQUE = 1; //error type
const QUERY_ERR = -1; //connection error in query

var express = require('express');
var router = express.Router();

// create the routers you need
router.post('/', (req, res) => {
    // req.body is the body of json payload sent from component
    // (err, result) is the callback function in the parameter of all queries in comment_queries.js
    // we use it to guarantee a returned result
    queries.getComments(req.body, (err, result) => {
        if (err) {
            res.json(result); // send result to component
        } else {
            console.log(err);
            res.json(null); // just send back nothing
        }
    })
});