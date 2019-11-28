const queries = require("../custom_modules/comment_queries");
const NOT_UNIQUE = 1; //error type
const QUERY_ERR = -1; //connection error in query

var express = require("express");
var router = express.Router();

// create the routers you need
// router.post("/", (req, res) => {
//   // req.body is the body of json payload sent from component
//   // (err, result) is the callback function in the parameter of all queries in comment_queries.js
//   // we use it to guarantee a returned result
//   queries.getComments(req.body, (err, result) => {
//     if (err) {
//       console.log(err);
//       res.json(null); // just send back nothing
//     } else {
//       res.json(result); // send result to component
//     }
//   });
// });

router.get("/", function(req, res, next) {
  console.log(req);
  //res.json(bookData);
  pool
    .query("select * from comments")
    .then(result => {
      console.log(result);
      res.json(result);
    })
    .catch(err => {
      console.log(err);
    });
});

router.post("/getComments", (req, res) => {
  queries.getComments(req.body, (err, result) => {
    if (err) {
      console.log(
        "Error in /backend/routes/comments : " + "from getComments\n" + err
      );
      res.json(null);
    } else {
      console.log(result);
      res.json(result);
    }
  });
});

router.post("/insertComment", (req, res) => {
  queries.addComment(req.body, (err, result) => {
    if (err) {
      console.log(
        "Error in /backend/routes/comments : " + "from addComment\n" + err
      );
      res.json(null);
    } else {
      console.log(result);
      res.json(result); //insert successful
    }
  });
});

router.post("/isPurchased", (req, res) => {
  queries.isPurchased(req.body, (err, result) => {
    if (err) {
      console.log(
        "Error in /backend/routes/comments : " + "from isPurchsed\n" + err
      );
      //res.json(null);
      res.json({decision: false});
    } else {
      console.log(result);
      //res.json(result);
      res.json({decision: true}); //insert successful
    }
  });
});

router.post("/purchaseBook", (req, res) => {
  queries.PurchasedBook(req.body, (err, result) => {
    if (err) {
      console.log(
        "Error in /backend/routes/comments : " + "from PurchaseBook\n" + err
      );
      res.json(null);
    } else {
      console.log(result);
      res.json(result); //insert successful
    }
  });
});

module.exports = router;
