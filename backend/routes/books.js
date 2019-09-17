var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.json([
        {
            bookID: 1,
            author: 'Mike Tyson',
            title: 'A Catcher in the Rye',
            rating: '5',
            price: '9.99',
            topseller: true
        },
        {
            bookID: 2,
            author: 'Mike Tyson',
            title: 'To Kill A Mokingbird',
            rating: '5',
            price: '9.99'
        },
        {
            bookID: 3,
            author: 'Mike Tyson',
            title: 'To Kill A Mokingbird',
            rating: '5',
            price: '9.99'
        },
        {
            bookID: 4,
            author: 'Mike Tyson',
            title: 'To Kill A Mokingbird',
            rating: '5',
            price: '9.99'
        },
        {
            bookID: 5,
            author: 'Mike Tyson',
            title: 'To Kill A Mokingbird',
            rating: '5',
            price: '9.99'
        }
    ]);
});

module.exports = router;
