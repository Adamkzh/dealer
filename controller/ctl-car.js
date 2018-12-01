let carServices = require('../services/cars-services');


module.exports.getSearch = function(req, res, next) {
    let dealerCars = [];
    let individualCars = [];
    let position = {
        dStart: 0,
        dPrev: 0,
        iStart: 0,
        iPrev: 0,
    };
    req.session.position = {...position};
    carServices.getAllDealerCars()
        .then((result) => {
            dealerCars = result;
            carServices.getAllIndividualCars()
                .then((result) => {
                    individualCars = result;
                    res.render('pg-home',
                        {title: "Car Dealer", dealerCars: dealerCars,
                            individualCars: individualCars, position: position});
                });
        })
        .catch(err => {
            console.log(err);
        });
};

module.exports.getSearchWithDealerOffset = function(req, res, next) {
    let start = parseInt(req.params.start);
    let dealerCars = [];
    let individualCars = [];
    res.locals.position.dStart = start;
    res.locals.position.dPrev =  start - 5;
    let position = {...res.locals.position};
    carServices.getAllDealerCars()
        .then((result) => {
            dealerCars = result;
            carServices.getAllIndividualCars()
                .then((result) => {
                    individualCars = result;
                    res.render('pg-home',
                        {title: "Car Dealer", dealerCars: dealerCars,
                            individualCars: individualCars, position: position});
                });
        })
        .catch(err => {
            console.log(err);
        });
};

module.exports.getSearchWithIndividualOffset = function(req, res, next) {
    let start = parseInt(req.params.start);
    let dealerCars = [];
    let individualCars = [];
    res.locals.position.iStart = start;
    res.locals.position.iPrev = start - 5;
    let position = {...res.locals.position};
    carServices.getAllDealerCars()
        .then((result) => {
            dealerCars = result;
            carServices.getAllIndividualCars()
                .then((result) => {
                    individualCars = result;
                    res.render('pg-home',
                        {title: "Car Dealer", dealerCars: dealerCars,
                            individualCars: individualCars, position: position});
                });
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