let express = require('express');
let router = express.Router();

let ctlIndividual = require('../controller/ctl-individual');
let ctlDealer = require('../controller/ctl-dealer');
let ctlCar = require('../controller/ctl-car');
let ctlTransaction = require('../controller/ctl-transaction');
let ctlLogout = require('../controller/ctl-logout');


router.get('/', ctlCar.getSearch);

router.get('/register', function(req, res, next) {
    res.render('pg-register', {title: "Register"});
});
router.post('/register-dealer', ctlDealer.postRegister);
router.post('/register-individual', ctlIndividual.postRegister);

router.post('/login', function(req, res, next) {
    let accountType = req.body.accountType;
    console.log(req.body);
    if (accountType === "individual") {
        return ctlIndividual.postLogin(req, res, next);
    } else {
        return ctlDealer.postLogin(req, res, next);
    }
});

router.get('/logout', ctlLogout.getLogout);

router.get('/search', ctlCar.getSearch);

router.get('/profile', function(req, res, next) {
    res.render('pg-profile', {title: "Profile"});
});

router.get('/post-car', function (req, res, next) {
    res.render('create-post', {title: "Car Post"});
});

router.post('/post-car', ctlCar.postCar);

router.post('/buy-car', ctlTransaction.buyCar);

router.get('/edit-post', function(req, res, next) {
    ctlCar.getSearch()
        .then((result) => {
            console.log(result);
        })
        .catch(err => {
            console.log(err);
        });
});

module.exports = router;