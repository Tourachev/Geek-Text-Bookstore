var express = require("express");
var router = express.Router();

/* GET purchase page. */
router.get("/", function(req, res, next) {
  console.log("Purchase Page.........");
  res.render("purchase", {
    title: "purchase"
  });
});

module.exports = router;
