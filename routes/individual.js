let express = require('express');
let router = express.Router();
let individualService = require('../services/individual-service');

/* GET home page. */
router.get('/', function(req, res, next) {
  individualService.getAllIndividual()
      .then((result) => {
        console.log(result);
      })
      .catch(err => {
        console.log(err);
      });
});

module.exports = router;
