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
    let {manufacture, model, year, price, ownerId, accountType} = {...req.body};
    // console.log(manufacture, model, year, price, ownerId, accountType);
    if (accountType === '1') {
        carServices.addCar(manufacture, model, year, parseInt(price))
            .then((result) => {
                // console.log(result);
                carServices.addDealerOwn(ownerId, result["insertId"])
                    .then((result) => {
                        res.status(200);
                        res.redirect('/');
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(400);
                        res.json({error: "post failed"});
                    });
            })
            .catch(err => {
                console.log(err);
                res.status(400);
                res.json({error: "post failed"});
            });
    } else {
        carServices.addCar(manufacture, model, year, parseInt(price))
            .then((result) => {
                // console.log(result);
                carServices.addIndividualOwn(ownerId, result["insertId"])
                    .then((result) => {
                        res.status(200);
                        res.redirect('/');
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(400);
                        res.json({error: "post failed"});
                    });
            })
            .catch(err => {
                console.log(err);
                res.status(400);
                res.json({error: "post failed"});
            });
    }
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

module.exports.getCarById = function (req, res, next) {
    let carId = req.params.carId;
    carServices.getCarById(carId)
        .then(result => {
            console.log(result);
            res.render('pg-edit-post', {title: "Edit Your Post", car: result});
        })
        .catch(err => {
            console.log(err);
            res.status(400);
            res.json({error: "fetch car failed"});
        })

};