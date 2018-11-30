let carServices = require('../services/cars-services');


module.exports.getSearch = function(req, res, next) {
    let postedCars = [];
    carServices.getAllCars()
        .then((result) => {
            postedCars = result;
            res.render('pg-home', {title: "Car Dealer", postedCars: postedCars});
        })
        .catch(err => {
            console.log(err);
        });
};

module.exports.postCar = function(req, res, next) {
    let {manufacture, model, year, owner} = {...req.body};
    carServices.addCar(manufacture, model, year, owner)
        .then((result) => {
            console.log(result);
        })
        .catch(err => {
            console.log(err);
        });
};

module.exports.editCar = function(req, res, next) {
    let {carId, manufacture, model, year, owner} = {...req.body};
    carServices.updateCarOwner(carId, manufacture, model, year, owner)
        .then((result) => {
            console.log(result);
        })
        .catch(err => {
            console.log(err);
        });
};