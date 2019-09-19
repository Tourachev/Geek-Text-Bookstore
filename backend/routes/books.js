var express = require("express");
var router = express.Router();

const bookData = require("./data");
const realData = require("../app");

router.get("/", function(req, res, next) {
    console.log("hey");
    res.json(bookData);
    console.log(realData.bookSort.byTitle("Harry Potta"));
});

module.exports = router;
