let express = require('express');
let router = express.Router();
let individualServices = require('../services/individual-services');
let dealearServices = require('../services/dealer-services');
let carServices = require('../services/cars-services');

let ctlIndividual = require('../controller/ctl-individual');
let ctlDealer = require('../controller/ctl-dealer');

router.get('/', function (req, res, next) {
    res.render('pg-home', {title: "Car Dealer"});
});

router.get('/register', function(req, res, next) {
    res.render('pg-register', {title: "Register"});
});
router.post('/register', function(req, res, next) {
    res.render('pg-register', {title: "Register"});
});

router.post('/login', function(req, res, next) {
    let userType = req.body.type;
    console.log(req.body);
    // if (userType === "individual") {
    //     return ctlIndividual.postLogin(req, res, next);
    // } else {
        return ctlDealer.postLogin(req, res, next);
    // }
});

router.get('/search', function(req, res, next) {
    dealearServices.getAllDealers()
        .then((result) => {
            console.log(result);
        })
        .catch(err => {
            console.log(err);
        });
});

router.get('/post-car', function(req, res, next) {
	console.log("getting cars");
    carServices.getAllCars()
        .then((result) => {
			res.status(200);
            console.log(result);
        })
        .catch(err => {
            console.log(err);
        });
});

router.get('/edit-post', function(req, res, next) {
    carServices.getAllCars()
        .then((result) => {
            console.log(result);
        })
        .catch(err => {
            console.log(err);
        });
});

module.exports = router;