let individualServices = require('../services/individual-services');

module.exports.postLogin = function(req, res, next) {
    let id = req.body.id;
    let pwd = req.body.password;
    if(!id || id.length === 0) {
        res.json({error: "id cannot be empty"});
        return;
    }
    if(!pwd || pwd.length === 0) {
        res.json({error: "password cannot be empty"});
        return;
    }
    individualServices.getIndividualById(id)
        .then(individual => {
            if (!individual.individualID) {
                res.status(404);
                res.json({error: "User does not exist"});
            }
            if (individual.Password !== pwd) {
                res.status(404);
                res.json({error: "ID and password does not match"});
            }
            //persist user to session
            req.session.user = individual;
            res.status(200);
            res.json(individual);
        })
        .catch(err => {
            console.log(err);
            res.status(400);
            res.json({error: "log in failed"});
        });
};

module.exports.postRegister = function(req, res, next) {
    let {lastName, firstName, password} = {...req.body};
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
    individualServices.addIndividualAccount(firstName, lastName, password)
        .then(individual => {
            res.status(200);
            console.log(individual);
            res.render('pg-home', {title: "Car Dealer"});
        })
        .catch(err => {
            console.log(err);
            res.status(400);
            res.json({error: "individual account registration failed"});
        });
};
