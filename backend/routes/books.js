var express = require("express");
var router = express.Router();

router.get("/", function(req, res, next) {
    res.json([
        {
            bookID: 1,
            title: "A Catcher in the Rye"
        },
        {
            bookID: 2,
            title: "To Kill A Mokingbird"
        },
        {
            bookID: 3,
            title: "To Kill A Mokingbird"
        },
        {
            bookID: 4,
            title: "To Kill A Mokingbird"
        },
        {
            bookID: 5,
            title: "To Kill A Mokingbird"
        }
    ]);
});

module.exports = router;
