let individualServices = require('../services/individual-services');

module.exports.postLogin = function(req, res, next) {
    //let id = req.body.id;
	var username = req.body.username;
	console.log(username);
    let password = req.body.password;

	
    if(!password || password.length === 0) {
        res.json({error: "password cannot be empty"});
        return;
    }
    individualServices.getIndividualByUsername(username)
        .then(individual => {
            if (!individual.IndividualID) {
                res.status(404);
                res.json({error: "User does not exist"});
            }
			
			
			//TODO: verify password when log-on using encryption
			//individual.Salt, individual.Hash

			const bcrypt = require('bcrypt');
			bcrypt.compare(password, individual.Hash, function(err, resBcrypt) {
				// resBcrypt == true
				
				if (resBcrypt == true)
				{
					//persist user to session
					req.session.user = individual;
					req.session.accountType = 2;
					res.status(200);
					res.json(individual);
					console.log("password matching!");
					console.log("log in successful!");
					console.log(password);
					console.log(individual.Hash);
				}
				else
				{
					res.status(400);
					res.json({error: "password not matching :("});
					console.log("password not matching :(");
					console.log(password);
					console.log(individual.Hash);
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
	console.log(req.body);
	//console.log(req.query);
    let {lastName, firstName, username, password} = {...req.body};
    if(!lastName || lastName.length === 0) {
        res.json({error: "last name cannot be empty"});
        return;
    }
    if(!firstName || firstName.length === 0) {
        res.json({error: "first name cannot be empty"});
        return;
    }
    if(!password || password.length === 0) {
        res.json({error: "password cannot be empty"});
        return;
    }
    individualServices.addIndividual(firstName, lastName, username, password)
        .then(individual => {
            res.status(200);
            console.log(individual);
			console.log("individual register success!");
            res.redirect('/');
        })
        .catch(err => {
            console.log(err);
            res.status(400);
            res.json({error: "individual account registration failed"});
        });
};

module.exports.testEncryption = function(req, res, next) {

    individualServices.testEncryption('')
        .then(individual => {
			res.json({});
        })
        .catch(err => {
            console.log(err);
            res.status(400);
            res.json({error: "individual account registration failed"});
        });
};

module.exports.getIndividualPostedCarAndTransaction = function(req, res, next) {
    let postedCars = [];
    let transactions = [];
    individualServices.getIndividualPostedCar(res.locals.userInfo.IndividualID)
        .then(result => {
            postedCars = result;
            individualServices.getIndividualTransaction(res.locals.userInfo.IndividualID)
                .then(result => {
                    console.log(result);
                    res.render('pg-profile',
                        {title: "Profile", postedCars: postedCars, transactions: result});
                })
                .catch(err => {
                    console.log(err);
                    res.status(400);
                    res.json({error: "get individual transaction failed"});
                });
        })
        .catch(err => {
           console.log(err);
            res.status(400);
            res.json({error: "get individual posted cars failed"});
        });
};

