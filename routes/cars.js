let express = require('express');
let router = express.Router();
let carServices = require('../services/cars-services');

/* GET home page. */
router.get('/', function(req, res, next) {
    carServices.getAllCars()
      .then((result) => {
        console.log(result);
      })
      .catch(err => {
        console.log(err);
      });
});

module.exports = router;
