var express = require("express");
var router = express.Router();

router.get("/", function(req, res, next) {
    res.json([
        {
            bookID: 1,
            author: "Mike Tyson",
            title: "A Catcher in the Rye",
            genre: "Horror",
            rating: "5",
            price: "9.99",
            topseller: true
        },
        {
            bookID: 2,
            author: "Hillary Clinton",
            title: "To Kill A Mokingbird",
            genre: "Pulp Fiction",
            rating: "5",
            price: "9.99"
        },
        {
            bookID: 3,
            author: "Bob Dylan",
            title: "To Kill A Mokingbird",
            genre: "Comedy",
            rating: "5",
            price: "9.99"
        },
        {
            bookID: 4,
            author: "Zulu Nation",
            title: "To Kill A Mokingbird",
            genre: "Drama",
            rating: "5",
            price: "9.99"
        },
        {
            bookID: 5,
            author: "Mike Tyson",
            title: "To Kill A Mokingbird",
            genre: "horror",
            rating: "5",
            price: "9.99"
        }
    ]);
});

module.exports = router;
