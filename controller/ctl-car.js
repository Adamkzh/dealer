let carServices = require('../services/cars-services');

module.exports.getSearch = function(req, res, next) {
    carServices.getAllCars()
        .then((result) => {
            console.log(result);
        })
        .catch(err => {
            console.log(err);
        });
};