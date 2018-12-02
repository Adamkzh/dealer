let dealerServices = require('../services/dealer-services');

module.exports.postLogin = function(req, res, next) {
    //let id = req.body.id;
	var username = req.body.username;
	console.log(username);
    let pwd = req.body.password;

	
    if(!pwd || pwd.length === 0) {
        res.json({error: "password cannot be empty"});
        return;
    }
    dealerServices.getDealerByUsername(username)
        .then(dealer => {

		
			const bcrypt = require('bcrypt');
			bcrypt.compare(pwd, dealer.Hash, function(err, resBcrypt) {
				if (resBcrypt == true)
				{
					//persist user to session
					req.session.user = dealer;
					req.session.accountType = 1;
					res.status(200);
					res.json(dealer);
					console.log("password matching!");
					console.log("dealer log in successful!");
					console.log(pwd);
					console.log(dealer.Hash);
				}
				else
				{
					res.status(400);
					res.json({error: "dealer password not matching :("});
					console.log("dealer password not matching :(");
					console.log(pwd);
					console.log(dealer.Hash);
				}
			});
			

        })
        .catch(err => {
            console.log(err);
            res.status(400);
            res.json({error: "log in failed"});
        });
};

module.exports.postRegister = function(req, res, next) {
    let {dealerName, userName, password} = {...req.body};
    if (!dealerName || dealerName.length === 0) {
        res.json({error: "dealer name cannot be empty"});
        return;
    }
    if (!userName || userName.length === 0) {
        res.json({error: "dealer account user name cannot be empty"});
        return;
    }
    if (!password || password.length === 0) {
        res.json({error: "dealer password cannot be empty"});
    }
    dealerServices.addDealer(dealerName, userName, password)
        .then(dealer => {
            res.status(200);
            console.log(dealer);
            res.redirect('/');
        })
        .catch(err => {
            console.log(err);
            res.status(400);
            res.json({error: "registration failed"});
        });
};


module.exports.getAllDealer = function(req, res, next) {
    servDealer.getAllDealer()
        .then((result) => {
            //console.log(result);
            res.json(result);
        })
        .catch(err => {
            console.log(err);
        });
};

module.exports.getDealerPostedCarAndTransaction = function(req, res, next) {
    let postedCars = [];
    dealerServices.getDealerPostedCar(res.locals.userInfo.DealerId)
        .then(result => {
            postedCars = result;
            dealerServices.getDealerTransaction(res.locals.userInfo.DealerId)
                .then(result => {
                    // console.log(result);
                    res.render('pg-profile',
                        {title: "Profile", postedCars: postedCars, transactions: result});
                })
                .catch(err => {
                    console.log(err);
                    res.status(400);
                    res.json({error: "get dealer transaction failed"});
                });
        })
        .catch(err => {
            console.log(err);
            res.status(400);
            res.json({error: "get dealer posted cars failed"});
        });
};
