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

function convertToDateTime( date) {
    return date.toISOString().slice(0, 19).replace('T', ' ');
}