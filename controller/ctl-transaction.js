let transactionServices = require('../services/transaction-services');

module.exports.buyCar = function(req, res, next) {
    let {dateTime, price} = {...req.body};
    transactionServices.addTransaction(dateTime, price)
        .then((result) => {
            console.log(result);
        })
        .catch(err => {
            console.log(err);
        });
};


module.exports.getAdminPage = function(req, res, next) {
    transactionServices.getDealerToIndividualTransaction()
        .then((result) => {
            var dealerToIndividualTransaction = result;
			
			transactionServices.getIndividualToDealerTransaction()
					.then((result) => {
						//console.log(result);
						
						var individualToDealerTransaction = result;
						
						transactionServices.getIndividualToIndividualTransaction()
							.then((result) => {
								//console.log(result);
								
								var individualToIndividualTransaction = result;
								
								
								var totalResult = {title: "Admin", dealerToIndividualTransaction: dealerToIndividualTransaction, 
								individualToDealerTransaction:individualToDealerTransaction, individualToIndividualTransaction: individualToIndividualTransaction,
								
								start: 0, prev: 0}
								
								//res.json(totalResult);
								res.render('pg-admin', totalResult);
							})
							.catch(err => {
								console.log(err);
							});
							
							


					})
					.catch(err => {
						console.log(err);
					});
			
        })
        .catch(err => {
            console.log(err);
        });
};


module.exports.addTransaction = function(req, res, next) {
    transactionServices.addTransaction(convertToDateTime(new Date()), 10000)
        .then((result) => {
            //console.log(result);
            res.json(result);
        })
        .catch(err => {
            console.log(err);
        });
};

module.exports.getDealerToIndividualTransaction = function(req, res, next) {
    transactionServices.getDealerToIndividualTransaction()
        .then((result) => {
            //console.log(result);
            res.json(result);
        })
        .catch(err => {
            console.log(err);
        });
};

module.exports.getIndividualToDealerTransaction = function(req, res, next) {
    transactionServices.getIndividualToDealerTransaction()
        .then((result) => {
            //console.log(result);
            res.json(result);
        })
        .catch(err => {
            console.log(err);
        });
};

module.exports.getIndividualToIndividualTransaction = function(req, res, next) {
    transactionServices.getIndividualToIndividualTransaction()
        .then((result) => {
            //console.log(result);
            res.json(result);
        })
        .catch(err => {
            console.log(err);
        });
};

module.exports.addDealerToIndividualTransaction = function(req, res, next) {
    console.log(req.body);
    transactionServices.addTransaction(convertToDateTime(new Date()), req.body.price)
        .then((result) => {
            //console.log(result);
            var resultOne = result;

            transactionServices.addDealerToIndividualTransaction(req.body.dealerId, result["insertId"],
                req.body.individualId, req.body.carId)
                .then((result) => {
                    //console.log(result);
                    res.json({resultOne, result});
                })
                .catch(err => {
                    console.log(err);
                });
        })
        .catch(err => {
            console.log(err);
        });
};

module.exports.addIndividualToDealerTransaction = function(req, res, next) {
    console.log(req.body);
    transactionServices.addTransaction(convertToDateTime(new Date()), req.body.price)
        .then((result) => {
            //console.log(result);
            var resultOne = result;
            transactionServices.addIndividualToDealerTransaction(req.body.dealerId, result["insertId"],
                req.body.individualId, req.body.carId)
                .then((result) => {
                    //console.log(result);
                    res.json({resultOne, result});
                })
                .catch(err => {
                    console.log(err);
                });
        })
        .catch(err => {
            console.log(err);
        });
};

module.exports.addIndividualToIndividualTransaction = function(req, res, next) {
    transactionServices.addTransaction(convertToDateTime(new Date()), req.query["price"])
        .then((result) => {
            //console.log(result);
            var resultOne = result;
            transactionServices.addIndividualToIndividualTransaction(req.query["individualIDOne"],result["insertId"],
                req.query["individualIDTwo"],req.query["carID"])
                .then((result) => {
                    //console.log(result);
                    res.json({resultOne, result});
                })
                .catch(err => {
                    console.log(err);
                });
        })
        .catch(err => {
            console.log(err);
        });
};

function convertToDateTime( date) {
    return date.toISOString().slice(0, 19).replace('T', ' ');
}