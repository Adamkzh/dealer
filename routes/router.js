let express = require('express');
let router = express.Router();

let ctlIndividual = require('../controller/ctl-individual');
let ctlDealer = require('../controller/ctl-dealer');
let ctlCar = require('../controller/ctl-car');

router.get('/', function (req, res, next) {
    res.render('pg-home', {title: "Car Dealer"});
});

router.get('/register', function(req, res, next) {
    res.render('pg-register', {title: "Register"});
});
router.post('/register', function(req, res, next) {
    let userType = req.body.type;
    if (userType === "individual") {
        return ctlIndividual.postRegister(req, res, next);
    } else {
        return ctlDealer.postRegister(req, res, next);
    }
});

router.post('/login', function(req, res, next) {
    let userType = req.body.type;
    if (userType === "individual") {
        return ctlIndividual.postLogin(req, res, next);
    } else {
        return ctlDealer.postLogin(req, res, next);
    }
});

router.get('/search', ctlCar.getSearch());

router.get('/post-car', function(req, res, next) {
    carServices.getAllCars()
        .then((result) => {
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