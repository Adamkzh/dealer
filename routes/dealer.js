let express = require('express');
let router = express.Router();
let dealerServices = require('../services/dealer-services');

/* GET home page. */
router.get('/', function(req, res, next) {
  dealerServices.getAllDealers()
      .then((result) => {
        console.log(result);
      })
      .catch(err => {
        console.log(err);
      });
});

module.exports = router;
