let individualServices = require('../services/individual-services');
let dealearServices = require('../services/dealer-services');
let carServices = require('../services/cars-services');

router.get('/register', function(req, res, next) {
    individualServices.getAllIndividual()
        .then((result) => {
            console.log(result);
        })
        .catch(err => {
            console.log(err);
        });
});

router.get('/login', function(req, res, next) {
    res.render('../views/index', {title: "Homepage"});
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