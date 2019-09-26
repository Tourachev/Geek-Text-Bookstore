var express = require("express");
var router = express.Router();

/* GET purchase page. */
router.get("/purchase", function(req, res, next) {
  res.render("purchase", {
    title: "purchase"
  });
});

module.exports = router;
