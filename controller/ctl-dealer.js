let dealerServices = require('../services/dealer-services');

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
    dealerServices.getDealerById(id)
        .then(dealer => {
            if (!dealer.DealerId) {
                res.status(404);
                res.json({error: "User does not exist"});
            }
            if (dealer.DealerPassword !== pwd) {
                res.status(404);
                res.json({error: "ID and password does not match"});
            }
            //persist user to session
            req.session.user = dealer;
            res.status(200);
            console.log(dealer);
            res.json(dealer);
        })
        .catch(err => {
            console.log(err);
            res.status(400);
            res.json({error: "log in failed"});
        });
};

module.exports.postRegister = function(req, res, next) {
    let {dealerName, dealderUsername, dealerPassword} = {...req.body};
    if (!dealerName || dealerName.length === 0) {
        res.json({error: "dealer name cannot be empty"});
        return;
    }
    if (!dealderUsername || dealderUsername.length === 0) {
        res.json({error: "dealer account user name cannot be empty"});
        return;
    }
    if (!dealerPassword || dealerPassword.length === 0) {
        res.json({error: "dealer password cannot be empty"});
    }
    dealerServices.addDealer(dealerName, dealderUsername, dealerPassword)
        .then(dealer => {
            res.status(200);
            console.log(dealer);
            res.json(dealer);
        })
        .catch(err => {
            console.log(err);
            res.status(400);
            res.json({error: "registration failed"});
        });
};
