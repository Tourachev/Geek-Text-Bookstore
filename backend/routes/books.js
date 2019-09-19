var express = require("express");
var router = express.Router();

const bookData = require("./data");

router.get("/", function(req, res, next) {
    res.json(bookData);
});

module.exports = router;
