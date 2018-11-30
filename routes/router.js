let express = require('express');
let router = express.Router();

let ctlIndividual = require('../controller/ctl-individual');
let ctlDealer = require('../controller/ctl-dealer');
let ctlCar = require('../controller/ctl-car');
let ctlTransaction = require('../controller/ctl-transaction');
let ctlLogout = require('../controller/ctl-logout');


let servIndividual = require('../services/individual-services');
let servDealer = require('../services/dealer-services');
let servCar = require('../services/cars-services');
let servTransaction = require('../services/transaction-services');
let servService = require('../services/service-services');



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

router.get('/getAllDealers', ctlDealer.getAllDealer);

router.post('/addTransaction', function(req, res, next) {
	
	servTransaction.addTransaction(convertToDateTime(new Date()), 10000)
	.then((result) => {
            //console.log(result);
			res.json(result);
        })
        .catch(err => {
            console.log(err);
        });;
	
	
});


function convertToDateTime( date) {
	return date.toISOString().slice(0, 19).replace('T', ' ');
}


router.get('/getDealerToIndividualTransaction', function(req, res, next) {
	
	servTransaction.getDealerToIndividualTransaction()
	.then((result) => {
            //console.log(result);
			res.json(result);
        })
        .catch(err => {
            console.log(err);
        });;
	
	
});

router.get('/getIndividualToDealerTransaction', function(req, res, next) {
	
	servTransaction.getIndividualToDealerTransaction()
	.then((result) => {
            //console.log(result);
			res.json(result);
        })
        .catch(err => {
            console.log(err);
        });;
	
	
});

router.get('/getIndividualToIndividualTransaction', function(req, res, next) {
	
	servTransaction.getIndividualToIndividualTransaction()
	.then((result) => {
            //console.log(result);
			res.json(result);
        })
        .catch(err => {
            console.log(err);
        });;
	
	
});


// Done: get inserted id
router.get('/addDealerToIndividualTransaction', function(req, res, next) {
	
	console.log(req.query);
	//console.log(res);
	//console.log(next);
	
	servTransaction.addTransaction(convertToDateTime(new Date()), req.query["price"])
	.then((result) => {
            //console.log(result);
			var resultOne = result;
			
			servTransaction.addDealerToIndividualTransaction(req.query["dealerID"], result["insertId"],req.query["individualID"], req.query["carID"])
			.then((result) => {
					//console.log(result);
					res.json({resultOne, result});
				})
				.catch(err => {
					console.log(err);
				});;
        })
        .catch(err => {
            console.log(err);
        });;
		
	

});


// Done: testing
router.get('/addIndividualToDealerTransaction', function(req, res, next) {
	
	servTransaction.addTransaction(convertToDateTime(new Date()), req.query["price"])
	.then((result) => {
            //console.log(result);
			var resultOne = result;
			
			servTransaction.addIndividualToDealerTransaction(req.query["dealerID"],result["insertId"], req.query["individualID"],req.query["carID"])
			.then((result) => {
					//console.log(result);
					res.json({resultOne, result});
				})
				.catch(err => {
					console.log(err);
				});;
        })
        .catch(err => {
            console.log(err);
        });;
	

	
	
});

// Done: testing
router.get('/addIndividualToIndividualTransaction', function(req, res, next) {
	
	servTransaction.addTransaction(convertToDateTime(new Date()), req.query["price"])
	.then((result) => {
            //console.log(result);
			var resultOne = result;
			
			servTransaction.addIndividualToIndividualTransaction(req.query["individualIDOne"],result["insertId"],req.query["individualIDTwo"],req.query["carID"])
			.then((result) => {
					//console.log(result);
					res.json({resultOne, result});
				})
				.catch(err => {
					console.log(err);
				});;
        })
        .catch(err => {
            console.log(err);
        });;
	

	
	
});





// Done: test out transaction service 

// TODO: display car list to the front end



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

router.get('/edit', function (req, res, next) {
    res.render('editPost', {title: "Edit Your Post"});
});

module.exports = router;